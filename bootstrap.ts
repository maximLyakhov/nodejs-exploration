import router from './router/router'
import express from 'express'
import cluster from 'cluster'
import { workerInfo } from './logs/clcLabels'
import { envalid } from './config/environment'
import { connect, disconnect } from 'mongoose'
import { cpus } from 'os'

/* middleware */
const app = express()
app.use(express.json())
app.use('/', router)

/* clustering */
if (cluster.isPrimary) {
  console.log(process.pid)
  console.log(`Master process [${process.pid}] has started. ${cpus().length} cores in use`)
  for (let i = 0; i < cpus().length; i++) cluster.fork()
}
if (cluster.isWorker) {
  app.listen(envalid.PORT, envalid.HOST)
  connect(envalid.DB_URI, {}, () => {
    if (cluster.worker !== undefined) {
      console.log(workerInfo('db', cluster.worker))
    }
  })
}

/* cluster events */
cluster.on('online', (worker) => console.log(workerInfo('online', worker)))
cluster.on('exit', (worker, code, signal): void => {
  void disconnect().then((res) => {
    console.log(workerInfo('db-disconnect', worker))
  })
  console.log(workerInfo('respawn', worker, code, signal))
  cluster.fork().emit('online')
})

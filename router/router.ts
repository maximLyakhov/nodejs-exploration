import express, { Router } from 'express'
import intensive from '../functions/intensive.function'
import offloadTask from '../helpers/workerPool'
import { run } from '../schemas/entry.schema'
import { WorkLoadService } from './workload.service'

const router: Router = express.Router()
  .get('/ppp', (request, response) => {
    const result = WorkLoadService.ppp()
    return response
      .status(200)
      .send(result)
  })
  .get('/', (request, response) => response.status(200).send(offloadTask(intensive)))
  .post('/entry', (request, response) => {
    run().catch(console.log)
    return response.status(201)
  })

export default router

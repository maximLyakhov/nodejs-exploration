import EventEmitter from 'events'
import offloadTask from '../helpers/workerPool'
import intensive from '../functions/intensive.function'

const emitter = new EventEmitter()

emitter.on('message', (message) => {
  const res = offloadTask(intensive)
  console.log('Message:', message, res)
})
emitter.on('error', (error) => console.log('Error: ', error))
emitter.emit('message', 'NodeJS EventEmitter in action')
emitter.emit('message')

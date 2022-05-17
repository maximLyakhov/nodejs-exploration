import clc from 'cli-color'
import { Worker } from 'cluster'

export const wpLabel = clc.black.bgYellow('workerpool')
export const fnLabel = clc.blue('function')
export const rtLabel = clc.red('returned:')

export function funcLabel (name: string): string {
  return clc.yellow(name)
}

export function workerInfo (type: string, worker: Worker, code: number = 0, signal: string = ''): string {
  const workerID = `${worker.id}:[${String(worker.process.pid)}]`
  switch (type) {
    case 'online':
      return clc.greenBright(
        `Worker ${workerID} spawned`
      )
    case 'respawn':
      return clc.redBright(
        `Worker ${workerID} died with code: ${code} and signal: ${signal}`
      )
    case 'db':
      return clc.yellowBright(
        `Worker ${workerID} connected to DB`
      )
    case 'db-disconnect':
      return clc.redBright(
        `DB disconnected from worker ${workerID}`
      )
    default:
      return ''
  }
}

import { pool as WorkerPool } from 'workerpool'
import { fnLabel, wpLabel, rtLabel, funcLabel } from '../logs/clcLabels'

export default async function offloadTask <T> (passedFunction: () => T): Promise<T> {
  const workerPool = WorkerPool()
  const funcName = funcLabel(passedFunction.name)
  console.log(fnLabel, funcName, 'is offloaded to', wpLabel)

  return await workerPool
    .exec(passedFunction, null)
    .then((result) => {
      console.group()
      console.time(`Worker task on ${funcName} took`)
      console.groupEnd()
      return result
    })
    .then((result) => {
      console.group()
      console.group()
      console.log(fnLabel, funcName, rtLabel, result)
      console.timeEnd(`Worker task on ${funcName} took`)
      console.groupEnd()
      console.groupEnd()
      void workerPool.terminate()
      process.disconnect()
      return result
    })
}

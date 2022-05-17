import { cleanEnv, str, port, host } from 'envalid'
import { credentials } from "../credentials";

process.env.NODE_ENV = 'development'

const uri = 'mongodb+srv://' + credentials + '/database?retryWrites=true&w=majority'

export const envalid = cleanEnv(process.env, {
  PORT: port({ default: 3000 }),
  HOST: host({ default: '127.0.0.1' }),
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  DB_URI: str({ default: uri })
})

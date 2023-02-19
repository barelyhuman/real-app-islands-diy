import Knex from 'knex'
import process from 'process'
const knexfile = require('../../knexfile')

let connection

const connect = () => {
  const activeConfig = knexfile[process.env.NODE_ENV || 'development']
  return connection || ((connection = Knex(activeConfig)), connection)
}

export const db = connect()

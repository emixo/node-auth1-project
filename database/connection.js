const knex = require('knex')

const knexfile = require('./knexfile.js')
const enviroment = repocess.env.NODE_ENV || 'devleopment'

module.exports = knex(knexfile[enviroment])


const bunyan = require('bunyan')

const log = bunyan.createLogger({ name: 'RADAR', level: 'debug' })

module.exports = log

/**
 * Mailer Service
 * */

global.Promise = require('bluebird')
const QueueManager = require('./lib/queue')

let queue = new QueueManager()

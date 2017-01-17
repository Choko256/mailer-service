/**
 * Queue manager by subscribing on a Redis Channel
 * */

const Redis = require('redis')
const Configuration = require('./config')
const EventEmitter = require('events').EventEmitter
const Mailer = require('./mailer')

class QueueManager extends EventEmitter {
    constructor() {
        super()
        this.client = Redis.createClient({
            host: Configuration.redis.host,
            port: Configuration.redis.port,
            prefix: Configuration.redis.prefix,
            db: Configuration.redis.db,
            password: Configuration.redis.pass
        })
        
        this.client.on('message', (channel, message) => {
            let mailObj = JSON.parse(message)
            Mailer.send(mailObj).then((info) => {
                this.emit('message-sent', info)
            })
        })
        this.client.subscribe('mss-channel')
    }
    
    quit() {
        this.client.quit()
    }
}

module.exports = QueueManager

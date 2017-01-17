/**
 * Mailing system
 * */

const Nodemailer = require('nodemailer')
const Configuration = require('./config')

module.exports = {
    send(options) {
        return new Promise((resolve, reject) => {
            if (!options) {
                throw new Error('Empty mail options.')
            }
            
            let transport = Nodemailer.createTransport({
                host: Configuration.mail.host,
                port: Configuration.mail.port,
                secure: Configuration.mail.tls,
                requireTLS: false,
                tls: {
                    rejectUnauthorized: true
                },
                auth: {
                    user: Configuration.mail.user,
                    pass: Configuration.mail.pass
                }
            })
            options = Object.assign({}, options, Configuration.mail.default)
            transport.sendMail(options, (err, info) => {
                if (err) {
                    throw err
                }
                resolve(info)
            })
        })
    }
}

/**
 * Mailing system
 * */

const Nodemailer = require('nodemailer')
const Configuration = require('./config')
const XOAuth2 = require('xoauth2')

module.exports = {
    xoauth2() {
        return XOAuth2.createXOAuth2Generator({
            user: Configuration.mail.auth.user,
            accessUrl: Configuration.mail.auth.accessUrl,
            clientId: Configuration.mail.auth.clientId,
            clientSecret: Configuration.mail.auth.clientSecret
        })
    },
    xoauth2google() {
        return XOAuth2.createXOAuth2Generator({
            service: Configuration.mail.auth.service,
            user: Configuration.mail.auth.user,
            scope: 'https://mail.google.com/',
            privateKey: Configuration.mail.auth.privateKey
        })
    },
    send(options) {
        return new Promise((resolve, reject) => {
            if (!options) {
                throw new Error('Empty mail options.')
            }
            
            let transportOptions = {
                host: Configuration.mail.host,
                port: Configuration.mail.port,
                secure: Configuration.mail.tls,
                requireTLS: true,
                tls: {
                    rejectUnauthorized: true
                }
            }
            
            if (Configuration.mail.auth) {
                transportOptions.auth = {}
                let method = Configuration.mail.auth.method
                let publisher = Configuration.mail.auth.publisher
                let security = this[method]
                if (publisher) {
                    security = this[`${method}${publisher}`]
                }
                transportOptions.auth[method] = security()
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

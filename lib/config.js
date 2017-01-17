const Yaml = require('js-yaml')
const Fs = require('fs')

module.exports = Yaml.safeLoad(Fs.readFileSync(`config/config.${process.env.NODE_ENV}.yml`))

const { existsSync, writeFileSync, mkdirSync } = require('fs')
const { join } = require('path')

const configDefault = require('./default')
const environment = process.env.NODE_ENV

const configUserName = (environment || 'config') + '.json'
const configUserPath = join(__dirname, 'environment')
const configUserFullPath = join(configUserPath, configUserName)

if (!existsSync(configUserPath)) {
    mkdirSync(configUserPath)
}

if (!existsSync(configUserFullPath)) {
    if (environment) {
        throw new Error(`Не найден файл конфига ${configUserName} для окружения ${environment}`)
    } else {
        writeFileSync(configUserFullPath, '{}\n')
    }
}

const configUser = require(configUserFullPath)

module.exports = Object.assign(configDefault, configUser)

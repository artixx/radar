const request = require('request-promise-native')

const { mapThreads, mapThreadsLight, mapThread } = require('./mappers')
const { token } = require('../config')
const log = require('./logger')

function requestOptions(uri, method = 'GET') {
    return {
        uri,
        method,
        simple: false,
        resolveWithFullResponse: true,
    }
}

async function errorHandler(ctx, next) {
    try {
        await next()
    } catch (e) {
        log.error(e)
    }
}

async function auth(ctx, next) {
    const authorization = ctx.headers.authorization
    if (authorization === token || !token) {
        await next()
    } else {
        log.warn(
            'Кто-то попытался сделать запрос без авторизации,',
            'информация о реквесте далее:\n',
            ctx.request
        )
        ctx.status = 401
        ctx.body = 'nope'
    }
}

async function getThreads(ctx) {
    try {
        const { board } = ctx.params
        console.log(`https://2ch.hk/${board}/catalog_num.json`)
        const response = await request(requestOptions(`https://2ch.hk/${board}/catalog_num.json`))
        const status = response.statusCode
        if (status === 200) {
            const threadsRaw = JSON.parse(response.body).threads
            ctx.body = mapThreads(threadsRaw)
        } else if (status === 404) {
            ctx.body = {
                error: 'Ну хз, двач говорит тут нихуя нет',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = status
        } else {
            ctx.body = {
                error: 'Двач вернул что-то странное...',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = 418
        }
    } catch (e) {
        log.error(e)
        ctx.status = 500
        ctx.body = JSON.stringify('Ошибка при запросе к двачу или парсинге его ответа')
        console.error(e)
    }
}

async function getThreadsLight(ctx) {
    try {
        const { board } = ctx.params
        const response = await request(requestOptions(`https://2ch.hk/${board}/index.json`))
        const status = response.statusCode
        if (status === 200) {
            const threadsRaw = JSON.parse(response.body).threads
            ctx.body = mapThreadsLight(threadsRaw)
        } else if (status === 404) {
            ctx.body = {
                error: 'Похоже, что тред всё',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = status
        } else {
            ctx.body = {
                error: 'Двач вернул что-то странное...',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = 418
        }
    } catch (e) {
        log.error(e)
        ctx.status = 500
        ctx.body = JSON.stringify('Ошибка при запросе к двачу или парсинге его ответа')
        console.error(e)
    }
}

async function getThread(ctx) {
    try {
        const { board, thread } = ctx.params
        const response = await request(requestOptions(`https://2ch.hk/${board}/res/${thread}.json`))
        const status = response.statusCode
        if (status === 200) {
            const threadRaw = response.body
            ctx.body = mapThread(JSON.parse(threadRaw))
        } else if (status === 404) {
            ctx.body = {
                error: 'Похоже что тред всё',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = status
        } else {
            ctx.body = {
                error: 'Двач вернул что-то странное...',
                status2ch: status,
                body2ch: ctx.body || null,
            }
            ctx.status = 418
        }
    } catch (e) {
        log.error(e)
        ctx.status = 500
        ctx.body = JSON.stringify('Ошибка при запросе к двачу или парсинге его ответа')
        console.error(e)
    }
}

module.exports = {
    errorHandler,
    auth,
    getThreads,
    getThread,
    getThreadsLight,
}

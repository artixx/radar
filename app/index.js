const Koa = require('koa')
const Router = require('koa-router')
const compress = require('koa-compress')
const favicon = require('koa-favicon')
const path = require('path')

const { errorHandler, auth, getThread, getThreads, getThreadsLight } = require('./modules/middlewares')
const log = require('./modules/logger')
const { port } = require('./config/index')

const app = new Koa()
const router = new Router()

router
    .get('/:board/threads-light', getThreadsLight)
    .get('/:board/threads', getThreads)
    .get('/:board/threads/:thread', getThread)

app
    .use(errorHandler)
    .use(favicon(path.join(__dirname, 'favicon.ico')))
    .use(auth)
    .use(router.routes())
    .use(compress())
    .listen(port)

log.info(`Radar activated at port ${port}`)

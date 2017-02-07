'use strict'

const root = process.cwd()
const hapi = require('hapi')
const bell = require('bell')

require('dotenv').config()

const {TWITTER_KEY, TWITTER_SECRET, INSTAGRAM_KEY, INSTAGRAM_SECRET} = process.env

const server = new hapi.Server()


const index = require(`${root}/routers/index.js`)
const twitter = require(`${root}/routers/twitter.js`)

server.connection({port: 3000})

server.route(index)

server.register(bell, _err => {
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password_secure',
        clientId: TWITTER_KEY,
        clientSecret: TWITTER_SECRET,
        isSecure: false
    })
    server.route(twitter)
    server.start()
})


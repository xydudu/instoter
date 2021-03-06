'use strict'

const root = process.cwd()
const hapi = require('hapi')
const bell = require('bell')

require('dotenv').config()

const {TWITTER_KEY, TWITTER_SECRET, INSTAGRAM_KEY, INSTAGRAM_SECRET} = process.env
const {TWITTER_CALLBACK, INSTAGRAM_CALLBACK} = process.env
const {PORT} = process.env

const server = new hapi.Server()


const index = require(`${root}/routers/index.js`)
const twitter = require(`${root}/routers/twitter.js`)
const instagram = require(`${root}/routers/instagram.js`)

server.connection({port: PORT})

server.register(require('vision'), _err => {
    // if (_err)  do what ?
    server.views({
        engines: {
            jade: require('pug')
        },
        path: `${root}/views`
    })    
    server.route(index)
})


server.register(bell, _err => {
    server.auth.strategy('twitter', 'bell', {
        provider: 'twitter',
        password: 'cookie_encryption_password_secure',
        clientId: TWITTER_KEY,
        clientSecret: TWITTER_SECRET,
        isSecure: false
        //location: TWITTER_CALLBACK
    })
    server.auth.strategy('instagram', 'bell', {
        provider: 'instagram',
        password: 'cookie_encryption_password_secure',
        clientId: INSTAGRAM_KEY,
        clientSecret: INSTAGRAM_SECRET,
        isSecure: false,
        location: INSTAGRAM_CALLBACK
    })
    server.route(twitter)
    server.route(instagram)
    server.start()
})


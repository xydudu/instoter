'use strict'

const root = process.cwd()
const Util = require(`${root}/util.js`)

module.exports = [
    {
        method: ['GET', 'POST'],
        path: '/instoter/twitter_login',
        config: {
            auth: 'twitter',
            handler: (_req, _res) => {
                if (!_req.auth.isAuthenticated) {
                    return _res('Authentication failed due to: ' + _req.auth.error.message)
                }
                Util.saveToken('twitter', _req.auth.credentials)
                    .then(_ => _res.redirect('/instoter'))
                    .catch(_err =>  _res(_err) )
            }
        }
    }, {
        method: 'GET',
        path: '/instoter/twitter_callback',
        config: {
            handler: (_req, _res) => {
                console.log(_req)
                return _res('back')
            }
        }
    }

]

'use strict'

const root = process.cwd()

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
                return _res('twitter auth ok')
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

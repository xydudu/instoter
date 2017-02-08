'use strict'

const root = process.cwd()

module.exports = [
    {
         method: ['GET', 'POST'],
         path: '/instoter/instagram_login',
         config: {
            auth: 'instagram',
            handler: (_req, _res) => {
                if (!_req.auth.isAuthenticated) {
                    return _res('Authentication failed due to: ' + _req.auth.error.message)
                }
                return reply.redirect('/')
            }
         }
    }, {
        method: 'GET',
        path: '/instoter/instagram_callback',
        config: {
            handler: (_req, _res) => {
                console.log(_req)
                return _res('instagram back')
            }
        }
    }
]

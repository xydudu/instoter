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
                Util.saveToken('instagram', _req.auth.credentials)
                    .then(_ => _res.redirect('/instoter'))
                    .catch(_err =>  _res(_err) )
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

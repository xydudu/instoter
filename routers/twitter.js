'use strict'

const root = process.cwd()

module.exports = {
     method: ['GET', 'POST'],
     path: '/twitter_login',
     config: {
        auth: 'twitter',
        handler: (_req, _res) => {
            if (!_req.auth.isAuthenticated) {
                return _res('Authentication failed due to: ' + _req.auth.error.message)
            }
            return reply.redirect('/')
        }
     }
}

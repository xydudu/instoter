'use strict'

const root = process.cwd()

module.exports = {
     method: ['GET', 'POST'],
     path: '/instagram_login',
     config: {
        auth: 'instagram',
        handler: (_req, _res) => {
            if (!_req.auth.isAuthenticated) {
                return _res('Authentication failed due to: ' + _req.auth.error.message)
            }
            return reply.redirect('/')
        }
     }
}

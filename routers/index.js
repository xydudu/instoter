'use strict'

const root = process.cwd()

module.exports = {
     method: ['GET', 'POST'],
     path: '/',
     config: {
        handler: (_req, _res) => {
            return _res('Hello')
        }
     }
}

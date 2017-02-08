'use strict'

const root = process.cwd()

module.exports = {
     method: ['GET', 'POST'],
     path: '/instoter',
     config: {
        handler: (_req, _res) => {
            return _res.view('index.jade')
        }
     }
}

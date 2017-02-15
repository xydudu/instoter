'use strict'

const root = process.cwd()
const Util = require(`${root}/util.js`)
const Task = require(`${root}/task.js`)

module.exports = {
     method: ['GET', 'POST'],
     path: '/instoter',
     config: {
        handler: (_req, _res) => {
            Promise.all([
                Util.readToken('twitter'),
                Util.readToken('instagram')
            ]).then(_data => {
                let [twitter, instagram] = _data
                return _res.view('index.jade', {twitter, instagram})
            }).catch(_err => {
                return _res(_err) 
            })
        }
     }
}

'use strict'

const root = process.cwd()
const assert = require('assert')
const Task = require(`${root}/task.js`)

describe('Task', () => {

    const task = new Task({
        task: `${root}/tasks/post-by-day.js`,
        day: '20170124'
    })
    it('task.start()', done => {
        task.start()
            .then(_app => {
                assert.equal(_app.pm_id, 0)
                done()
            })
            .catch(done)
    })

    it('task.end()', done => {
        task.end()
            .then(done)
            .catch(done)
    })

    it('task.list()', done => {
        task.list()
            .then(_list => {
                assert.equal(_list.length, 1)
                done()
            })
            .catch(done)
    })

})

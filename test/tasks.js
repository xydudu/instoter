'use strict'

const root = process.cwd()
const assert = require('assert')
const Task = require(`${root}/task.js`)

describe('Task', () => {

    const task = new Task({
        task: `${root}/tasks/post-by-day.js`,
        day: '20170124'
    })
    it('Task.start()', done => {
        task.start()
            .then(_app => {
                assert.equal(_app.pm_id, 0)
                done()
            })
            .catch(done)
    })

    it('Task.end()', done => {
        task.end()
            .then(done)
            .catch(done)
    })

})

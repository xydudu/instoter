'use strict'

const root = process.cwd()
const Task = require(`${root}/task.js`)

describe('Task', () => {

    const task = new Task('post-by-day', { day: '20170124' })
    it('Task.start()', done => {
        task.start()
        task.on('started', (_status) => {
            assert.equal(task.getStatus(), 'running')
            assert.equal(_status, 'running')
            done()
        })
        task.on('error', done) 
    })

    it('Task.end()', done => {
        task.end()
        task.on('end', (_status) => {
            assert.equal(task.getStatus(), 'end')
            assert.equal(_status, 'end')
            done()
        })
        task.on('error', done) 
    })

})

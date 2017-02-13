'use strict'

const root = process.cwd()
const EventEmitter = require('events')
const pm2 = require('pm2')

class Task extends EventEmitter {

    constructor(_settings) {
        super()
        this.task = _settings.task 
        this.day = _settings.day || false
        this.pid = 0
    } 

    connect() {
        return new Promise((_resolve, _reject) => {
            pm2.connect(_err => {
                if (_err) return _reject(_err)
                return _resolve()
            })
        })
    }
    
    start() {
        let _ = this
        return _.connect()
            .then(() => {
                return new Promise((_resolve, _reject) => {
                    pm2.start({
                        script : _.task,
                        instances : 1,
                        args: _.day,
                        max_memory_restart : '100M'
                    }, (_err, _apps) => {
                        if (_err) return _reject(_err)
                        _.pid = _apps[0].pm_id
                        _resolve(_apps[0])
                    })
                })
            })
    }

    end() {
        let _ = this
        return new Promise((_resolve, _reject) => {
            pm2.stop(_.pid, _err => {
                if (_err) return _reject(_err)
                _resolve()
            }) 
        })
    }

    getStatus() {
       
    }

}

module.exports = Task

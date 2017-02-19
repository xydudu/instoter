'use strict'

const root = process.cwd()
const Util = require(`${root}/util.js`)
//const moment = require('moment')
const moment = require('moment-timezone')
const Job = require('cron').CronJob

new Job('1 2 1 * * *', () => {
    
    const day = moment().tz('Asia/Shanghai')
                .add(-1, 'days').format('YYYYMMDD')
    Promise.all([
        Util.insByDay(day),
        Util.readToken('twitter')
    ]).then(_data => {
        if (_data[1].status === 0) {
            console.error('Token Error')
            return 
        }
        if (!_data[0].length) {
            console.error('No Photo Today')
            return 
        }
        return Util.PostToTwttier.apply(Util, _data)
    }).then(_data => {
        if (!_data.id) return console.error('Post Failed')
        console.log('Post ok')
    }).catch(_err => {
        console.error(_err)
        process.exit(1)
    })

}, null, true, 'Asia/Shanghai')

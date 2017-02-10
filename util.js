'use strict'

const fs = require('fs')
const request = require('request')
const moment = require('moment')
const Twitter = require('twitter')
const root = process.cwd()
const {TWITTER_KEY, TWITTER_SECRET} = process.env

class Util {
    static saveToken(_type, _token) {
        let file = `${root}/.${_type}`
        let {token, secret} = _token
        return new Promise((_resolve, _reject) => {
            fs.writeFile(file, `${token} ${secret}`, 'utf8', (_err) => {
                if (_err) return _reject(_err)
                _resolve()
            })
        })
    }  

    static readToken(_type) {
        let file = `${root}/.${_type}`
        return new Promise((_resolve, _reject) => {
            fs.readFile(file, 'utf8', (_err, _data) => {
                if (_err) return _resolve({status: 0})
                let [token, secret] = _data.split(' ')
                _resolve({token, secret, status: 1})
            })
        })
    }

    static fetch(_api) {
        return new Promise((_resolve, _reject) => {
            request(_api, (_err, _res, _body) => {
                if (_err) _reject(_err)
                _resolve(_body)
            })
        })
    }

    static insFilter(_feed, _day) {
        let data = _feed.data || [] 
        return data.filter(_item => {
            let created_time = parseInt(_item.created_time + '000')
            let day = moment(created_time).format('YYYYMMDD')
            return day === _day
        })
    }

    static insByDay(_day) {
        let _ = this
        return this.readToken('instagram')
            .then(_data => {
                let api = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${_data.token}`
                return _.fetch(api)
            })
            .then(_data => {
                return _.insFilter(_data, _day)
            })
    }

    static PostToTwttier(_feed, _token) {
        let api = `https://api.twitter.com/1.1/statuses/update.json` 
        let client = new Twitter({
            consumer_key: TWITTER_KEY,
            consumer_secret: TWITTER_SECRET,
            access_token_key: _token.token,
            access_token_secret: _token.secret
        })
        return new Promise((_resolve, _reject) => {
            client.post(api, {status: 'hello world'}, (_err, _body, _res) => {
            
                if (_err) return _reject(_err) 
                _resolve(_body)
                
            })
        })
    }
}

module.exports = Util

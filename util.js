'use strict'

const fs = require('fs')
const request = require('request')
const root = process.cwd()

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
            console.log(_api)
            request(_api, (_err, _res, _body) => {
                console.log(_body)
                if (_err) _reject(_err)
                _resolve(_body)
            })
        })
    }

    static insToday() {
        let _ = this
        return this.readToken('instagram')
            .then(_data => {
                let api = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${_data.token}`
                return _.fetch(api)
            })
    }
}

module.exports = Util

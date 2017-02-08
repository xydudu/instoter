'use strict'

const fs = require('fs')
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
}

module.exports = Util

'use strict'

const root = process.cwd()
const assert = require('assert')
const Util = require(`${root}/util.js`)

describe('Util', () => {
    
    let token = "24928756-5LqKbIGiuVEOjo2XMaHb0DuSIcF3qLi2IzuDKdFlx"

    it('Util.saveToken()', done => {
        Util.saveToken('twitter-test', {
            token: token,
            secret: "StVGXdvYLDOYHnqmwVkyPtw6eyqYZVlWmeci2nLZryr9b"
        }).then(_ => {
            return Util.readToken('twitter-test').then(_data => {
                assert.equal(_data.token, token)
                return done()
            }) 
        }).catch(done)
    })

    it('Promise.all two Util.readToken()', done => {
        Promise.all([
            Util.readToken('twitter-test'),
            Util.readToken('instagram-test')
        ]).then(_data => {
            assert.equal(_data[0].token, token) 
            assert.equal(_data[1].status, 0) 
            return done()
        }).catch(done) 
    })

    describe('Instagram', () => {
        
        it('Util.insToday()', function(done) {
            this.timeout(50000)
            Util.insToday() 
                .then(_data => {
                    console.log(_data)
                    done()
                })
                .catch(done)
        })
    })

})

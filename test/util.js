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
        
        // cause of GFW, this case can't running locally
        it('Util.insByDay("20170124")', function(done) {
            this.timeout(50000)
            Util.insToday('20170124') 
                .then(_data => {
                    done()
                })
                .catch(done)
        })

        it('Util.insFilter(feed)', () => {
            const feed = require(`${root}/test/.instagram-feed.json`)  
            const items = Util.insFilter(feed, '20170124')
            assert.equal(items.length, 2)
        }) 
    })

})

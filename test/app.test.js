/**
 * Test
 */

// Test plugins
const app     = require('../app.js')
const request = require('supertest')(app)
const should  = require('should')

// other
const env              = process.env.NODE_ENV
const models           = require('../models')
const ArticleListModel = models.ArticleList

/**
 * 测试路由请求状态
 */
describe('GET /', function () {
    it('should return home page with 200', function (done) {
        request
            .get('/')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function (err, res) {
                should.not.exists(err)
                res.status.should.equal(200)
                done()
            })
    })
})

/**
 * 测试 API 接口
 */
describe('Get /startup/get-home-news-data', function () {
    before(function (done) {
        let docs = [],
            docs_num = 2

        for (let i = 0; i < docs_num; i++) {
            docs.push({
                'id': i,
                'videourl': 'test txt',
                'audiourl': 'test txt',
                'imgurl': 'test txt',
                'shareurl': 'test txt',
                'author': 'test txt',
                'speciallabel': 'test txt',
                'speciallabelcolor': 'test txt',
                'detailurl': 'test txt',
                'title': 'test txt',
                'likenum': 123,
                'newstime': 1486719952762,
                'type': 123
            });
        }

        ArticleListModel.insertMany(docs, (err, docs)=>{
            if (err) return done(err)
            done()
        })
    })

    it.only('Route /startup/get-home-news-data should return 3 docs', (done)=>{
        request
            .get('/startup/get-home-news-data')
            .query({
                newsnum: 3
            })
            .set('Accept', 'application/json')
            .end((err, res)=>{
                should.not.exists(err)

                // 确保接口能访问到
                res.status.should.equal(200)

                // 确保接口返回的数据是正确的
                res.body.status.should.equal('success')
                res.body.length.should.equal(3)
                done()
            })
    })
})

/**
 * 只有被 .only 指定的测试单元才会执行
 */
describe('Test', ()=>{
    it.only('should return -1 unless present', ()=>{
        // ...
    })

    it.only('should return the index when present', ()=>{
        // this test will also be run
    })

    it('should return the index when present', ()=>{
        // ...
    })
})
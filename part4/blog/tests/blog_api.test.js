const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique property is named id', async () => {
    await api
    .get(`api/blogs/${blog.id}`)
    .expect()
})

afterAll(async () => {
    await mongoose.connection.close()
})
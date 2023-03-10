const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const { get, after } = require('lodash')
const bcrypt = require('bcrypt')
const blog = require('../models/blog')

const api = supertest(app)
let token

// root id: 640b2f86d3d9e36b8b579a1a

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.listWithManyBlogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)

    const response = await api.post('/api/login')
        .send({
            username: 'root',
            password: 'sekret'
        })

    token = response.body.token
    console.log(response.body)
})

describe('Default blogs saved', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unique property is named id', async () => {

        const response = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = response.body

        expect(blogs).toBeDefined()
        expect(blogs.length).toBeGreaterThan(0)
        blogs.forEach(blog => {
            expect(blog.id).toBeDefined()
            expect(blog._id).toBeUndefined()
        })
    })
})



describe('addition of a new blog', () => {
    test('able to create new blog post successfully', async () => {
        const newBlog = {
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "J.K. Rowling",
            url: "xd",
            likes: 10,
            user: User.id
        }

        const initialBlogs = await api.get('/api/blogs')

        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(initialBlogs.body.length + 1)

        const contents = response.body.map(n => n.title)
        expect(contents).toContain(
            'Harry Potter and the Prisoner of Azkaban'
        )
    })

    test('Likes property isnt missing', async () => {
        const noLike = {
            title: "50 shades of grey",
            author: "E. L. James",
            url: "https://www.eljamesauthor.com"
        }

        const initialBlogs = await api.get('/api/blogs')

        const response = await api
            .post('/api/blogs')
            .send(noLike)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        expect(response.body.likes === 0)
    })

    test('Status code 400 returned if name missing', async () => {
        const noName = {
            author: "E. L. James",
            url: "https://www.eljamesauthor.com",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(noName)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })

    test('Status code 400 returned if url missing', async () => {
        const noUrl = {
            title: "50 shades of grey",
            author: "E. L. James",
            likes: 0
        }

        await api
            .post('/api/blogs')
            .send(noUrl)
            .set('Authorization', `Bearer ${token}`)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})


describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        console.log(blogsAtStart[0])

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe('Editing a blog', () => {
    test('updating a blog works as expected', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]


        const updatedBlog = {
            title: "React patterns",
            author: "E. L. James",
            url: "https://www.eljamesauthor.com",
            likes: 0
        }

         await api
         .put(`/api/blogs/${blogToUpdate.id}`)
         .send(updatedBlog)
         .expect('Content-Type', /application\/json/)

        const afterUpdate = await helper.blogsInDb()

        expect(afterUpdate[0].title).toContain(
            '50 shades of grey'
        )
    })
})

describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  
    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }
  
      const result = await api
        .post('/api/users')
        .send(newUser)
        .set('Authorization', `Bearer ${token}`)
        .expect(400)
        .expect('Content-Type', /application\/json/)
  
      expect(result.body.error).toContain('expected `username` to be unique')
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
  })

afterAll(async () => {
    await mongoose.connection.close()
})
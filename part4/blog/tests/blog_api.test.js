const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const User = require('../models/user')
const Blog = require('../models/blog')
const { get, after } = require('lodash')
const bcrypt = require('bcrypt')
const blog = require('../models/blog')
const { request } = require('../app')

const api = supertest(app)
let token

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
            likes: 10
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

    test('401 unauthorized if token is not provided', async () => {
        const newBlog = {
            title: "Harry Potter and the Prisoner of Azkaban",
            author: "J.K. Rowling",
            url: "xd",
            likes: 10
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })

    test('Likes property isnt missing', async () => {
        const noLike = {
            title: "50 shades of grey",
            author: "E. L. James",
            url: "https://www.eljamesauthor.com"
        }

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

        const blogToDelete = {
            title: 'New blog',
            author: 'New author',
            url: 'https://newblog.com',
            likes: 10
          }

        await api
            .post('/api/blogs')
            .send(blogToDelete)
            .set('Authorization', `Bearer ${token}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfterPost = await helper.blogsInDb()
        expect(blogsAfterPost).toHaveLength(blogsAtStart.length + 1)

        const blogToDeleteId = blogsAfterPost[blogsAfterPost.length -1].id

        await api
            .delete(`/api/blogs/${blogToDeleteId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAfterPost.length - 1)

        const contents = blogsAtEnd.map(r => r.title)

        expect(contents).not.toContain(blogToDelete.title)
    })
})

describe('Editing a blog', () => {
    test('updating a blog works as expected', async () => {
        const blogsAtStart = await helper.blogsInDb()

        const blogToUpdate = blogsAtStart[0]


        const updatedBlog = {
            title: "50 shades of grey",
            author: "E. L. James",
            url: "https://www.eljamesauthor.com",
            likes: 0
        }

         await api
         .put(`/api/blogs/${blogToUpdate.id}`)
         .send(updatedBlog)
         .set('Authorization', `Bearer ${token}`)
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

    test('user with short username is not created', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          username: 'ro',
          name: 'Superuser',
          password: 'salainen',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          console.log(result.body.error)
    
        expect(result.body.error).toContain('`username` (`ro`) is shorter than the minimum allowed length (3)')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

    test('user with short password is not created', async () => {
        const usersAtStart = await helper.usersInDb()
  
        const newUser = {
          username: 'rooot',
          name: 'Superuser',
          password: 'sa',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .set('Authorization', `Bearer ${token}`)
          .expect(400)
          .expect('Content-Type', /application\/json/)

          console.log(result.body.error)
    
        expect(result.body.error).toContain('password should be 3 or more characters')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

  })

afterAll(async () => {
    await mongoose.connection.close()
})
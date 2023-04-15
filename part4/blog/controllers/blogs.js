const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/:id/comments', async (request, response) => {
  const blogId = request.params.id

  const comments = await Comment.find({ blog: blogId }).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  })

  response.json(comments)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  })

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const body = request.body
  const user = request.user
  const blogId = request.params.id

  const comment = new Comment({
    content: body.content,
    user: user.id,
    blog: blogId,
  })

  const savedComment = await comment.save()
  await savedComment.populate('user', { username: 1, name: 1, id: 1 })
  response.status(201).json(savedComment)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id).populate('user', {
    username: 1,
    name: 1,
  })
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).json({ error: 'blog not found' })
    return
  }

  if (user._id.toString() === blog.user._id.toString()) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'only the owner can delete blogs' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  await updated.populate('user', { username: 1, name: 1 })
  response.json(updated)
})

module.exports = blogsRouter

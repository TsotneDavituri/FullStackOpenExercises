import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: {
    blogs: [],
    singleBlog: null,
  },
  reducers: {
    setBlogs: (state, action) => {
      return { ...state, blogs: action.payload }
    },
    setSingleBlog: (state, action) => {
      return { ...state, singleBlog: action.payload }
    },
    appendNewBlog: (state, action) => {
      state.blogs.push(action.payload)
    },
  },
})

export const { setBlogs, setSingleBlog, appendNewBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const setBlog = id => {
  return async dispatch => {
    const blog = await blogService.getBlog(id)
    dispatch(setSingleBlog(blog))
  }
}

export const increaseLike = id => {
  return async dispatch => {
    const blogToUpdate = await blogService.getBlog(id)
    const changedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const blog = await blogService.update(id, changedBlog)
    dispatch(setSingleBlog(blog))
  }
}

export const createBlog = newObject => {
  return async dispatch => {
    const newBlog = await blogService.create(newObject)
    dispatch(appendNewBlog(newBlog))
  }
}

export default blogSlice.reducer

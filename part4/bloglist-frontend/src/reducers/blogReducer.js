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
  },
})

export const { setBlogs, setSingleBlog } = blogSlice.actions

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

export default blogSlice.reducer

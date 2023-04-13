import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    increaseLike: (state, action) => {
      const id = action.payload
      const blogToUpdate = state.find(a => a.id === id)
      const changedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
      blogService.update(id, changedBlog)
      return state.map(a => (a.id === id ? changedBlog : a))
    },
  },
})

export const { setBlogs, increaseLike } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer

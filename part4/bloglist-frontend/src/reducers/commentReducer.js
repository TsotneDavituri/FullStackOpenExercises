import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'Comments',
  initialState: [],
  reducers: {
    setComments: (state, action) => {
      return action.payload
    },
    appendComment(state, action) {
      state.push(action.payload)
    },
  },
})

export const { setComments, appendComment } = commentSlice.actions

export const initilizeComments = blogId => {
  return async dispatch => {
    const comments = await blogService.getComments(blogId)
    dispatch(setComments(comments))
  }
}

export const createComment = (content, blogId) => {
  return async dispatch => {
    const comment = await blogService.createComment(content, blogId)
    dispatch(appendComment(comment))
  }
}

export default commentSlice.reducer

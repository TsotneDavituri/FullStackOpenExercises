import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'


test('The form handler calls the event handler it receives as props', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog/>)

  const title = screen.getAllByPlaceholderText('title')
  const author = screen.getAllByPlaceholderText('author')
  const url = screen.getAllByPlaceholderText('url')

  const button = screen.getByText('submit')

  await user.type(title, 'testing the title form...')
  await user.type(author, 'testing the author form...')
  await user.type(url, 'testing the url form...')

})
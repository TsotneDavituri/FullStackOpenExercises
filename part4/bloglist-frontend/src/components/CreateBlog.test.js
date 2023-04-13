import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('The form handler calls the event handler it receives as props', async () => {
  const mockHandler = jest.fn()
  const user = userEvent.setup()

  render(<CreateBlog createBlog={mockHandler} />)

  const title = screen.getByPlaceholderText('title')
  const author = screen.getByPlaceholderText('author')
  const url = screen.getByPlaceholderText('url')

  const submitButton = screen.getByText('submit')

  await user.type(title, 'testing the title form...')
  await user.type(author, 'testing the author form...')
  await user.type(url, 'testing the url form...')
  await user.click(submitButton)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('testing the title form...')
  expect(mockHandler.mock.calls[0][0].author).toBe('testing the author form...')
  expect(mockHandler.mock.calls[0][0].url).toBe('testing the url form...')
})

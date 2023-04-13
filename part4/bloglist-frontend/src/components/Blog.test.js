import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('Displaying a blog renders the blogs Title and Author', () => {
  const loggedUser = {
    id: '1234',
  }

  const testBlog = {
    title: 'Harry Potter and the prisoner of azkaban',
    author: 'J.K. Rowling',
    url: 'https://www.wizardingworld.com/',
    likes: 0,
    user: {
      username: 'superuser',
      name: 'root',
      id: '123',
    },
  }

  const { container } = render(<Blog blog={testBlog} user={loggedUser} />)

  const div = container.querySelector('.authorTitle')
  const url = screen.queryByText('https://www.wizardingworld.com/')
  const likes = screen.queryByText('0')
  expect(div).toHaveTextContent('Harry Potter and the prisoner of azkaban')
  expect(div).toHaveTextContent('J.K. Rowling')
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('Clicking the view button reveals the URL and number of likes', async () => {
  const loggedUser = {
    id: '1234',
  }

  const testBlog = {
    title: 'Harry Potter and the prisoner of azkaban',
    author: 'J.K. Rowling',
    url: 'https://www.wizardingworld.com/',
    likes: 0,
    user: {
      username: 'superuser',
      name: 'root',
      id: '123',
    },
  }

  render(<Blog blog={testBlog} user={loggedUser} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const url = screen.queryByText('https://www.wizardingworld.com/')
  const likes = screen.queryByText('0')
  expect(url).toBeVisible()
  expect(likes).toBeVisible()
})

test('Clicking the like button twice, calls the event handler twice', async () => {
  const loggedUser = {
    id: '1234',
  }

  const testBlog = {
    title: 'Harry Potter and the prisoner of azkaban',
    author: 'J.K. Rowling',
    url: 'https://www.wizardingworld.com/',
    likes: 0,
    user: {
      username: 'superuser',
      name: 'root',
      id: '123',
    },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={testBlog} user={loggedUser} handleLike={mockHandler} />)

  const user = userEvent.setup()
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  const likeButton = screen.getByText('like')

  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

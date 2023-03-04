
const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Most blogs', () => {
  const listWithManyBlogs = helper.listWithManyBlogs
  test('The author with the most blogs calculated correctly', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    expect(result).toStrictEqual([{ "author": "Robert C. Martin", "blogs": 3 }])
  })
})
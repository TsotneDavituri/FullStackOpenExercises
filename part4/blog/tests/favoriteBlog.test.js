const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('favorite blogs', () => {
  const listWithManyBlogs = helper.listWithManyBlogs

  test('The favorite blog in this list calculated correctly', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[3])
  })
})
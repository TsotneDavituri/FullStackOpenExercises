const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('total likes', () => {

  const listWithManyBlogs = helper.listWithManyBlogs
  test('when list has blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

describe('Most likes', () => {
  const listWithManyBlogs = helper.listWithManyBlogs

  test('Most likes calculated correctly', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toStrictEqual([{
      author: "Edsger W. Dijkstra",
      likes: 17
    }])
  })
})
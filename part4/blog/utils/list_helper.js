const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const sum = Object.values(blogs).reduce((likes, blog) => {
        return likes += blog.likes
    }, 0)
    return sum
}

const favoriteBlog = (blogs) => {

    const highest = Object.values(blogs).reduce(( counter, blog) =>  {
        return counter < blog.likes ? blog.likes : counter
    }, 0)

    const favorite = blogs.filter(blog => {
        return blog.likes === highest
    })

    return favorite[0]
}

const mostBlogs = (blogs) => {
    const countAuthors = blogs.reduce((counter, blog) => {
        counter[blog.author] = (counter[blog.author] || 0) + 1
        return counter
    }, {})

    const biggestNumber = Object.values(countAuthors).reduce((counter, value) => {
        return counter > value ? counter : value
    }, 0)

    const most = Object.entries(countAuthors)
        .filter(([key, value]) => value === biggestNumber)
        .map(([key, value]) => ({ author: key, blogs: value }))

    return most

}

const mostLikes = (blogs) => {
    const countLikes = blogs.reduce((counter, blog) => {
        counter[blog.author] = (counter[blog.author] || 0) + blog.likes
        return counter
    }, {})

    const biggestNumber = Object.values(countLikes).reduce((counter, value) => {
        return counter > value ? counter : value
    }, 0)

    const mostLikes = Object.entries(countLikes)
        .filter(([key, value]) => value === biggestNumber)
        .map(([key, value]) => ({author: key, likes: value}))

    return mostLikes
}
  
module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
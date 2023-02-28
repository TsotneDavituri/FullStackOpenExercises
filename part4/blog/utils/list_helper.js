const _ = require('lodash')

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    let sum = 0

    for (i in blogs) {
        sum += blogs[i].likes
    }

    return sum
}

const favoriteBlog = (blogs) => {
    let sum = 0
    let blog = {}
    for (i in blogs) {
        if (sum < blogs[i].likes) {
            sum = blogs[i].likes
        }
    }

    for (i in blogs) {
        if (sum === blogs[i].likes) {
            blog = blogs[i]
        }
    }

    return blog
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
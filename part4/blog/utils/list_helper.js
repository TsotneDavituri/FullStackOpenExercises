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

    for(i in blogs) {
        if (sum === blogs[i].likes) {
            blog = blogs[i]
        }
    }

    return blog
}

const mostBlogs = (blogs) => {
    let MichaelChan = 0
    let EdgsarDijkstra = 0
    let RobertMartin = 0

    for (i in blogs) {
        if (blogs[i].author) {
            //todo
        }
    }
}

const mostLikes = (blogs) => {

}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs
  }
const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../Utils/list_helper')
const lodash =require('lodash')

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

const multiblog=[
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Dave',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Dave',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 8,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Dave',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }

]

describe('list_helper', () => {
    test('dummy returns one', () => {
        const blogs = []

        const result = listHelper.dummy(blogs)
        assert.strictEqual(result, 1)
    })
    test('singleBlog totalLikes usage returns that blog\'s likes',() => {
        const result=listHelper.totalLikes(listWithOneBlog)
        assert.strictEqual(result, 5)

    })
    test('multiblog likes aggregator',() => {
        const result=listHelper.totalLikes(multiblog)
        assert.strictEqual(result, 23)
    })
    test('get most liked blog',() => {
        const result=listHelper.favoriteBlog(multiblog)
        assert.deepStrictEqual(result, 
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Dave', url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf', likes: 8, __v: 0 })
    })
    test('author with most blogs, single blog', () => {
        const result=listHelper.mostBlogs(listWithOneBlog)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', blogs: 1})
    })
    test('author with most blogs, multi blog', () => {
        const result=listHelper.mostBlogs(multiblog)
        assert.deepStrictEqual(result, {author: 'Dave', blogs: 3})
    })
    test('author with most likes, single blog', () => {
        const result=listHelper.mostLikes(listWithOneBlog)
        assert.deepStrictEqual(result, {author: 'Edsger W. Dijkstra', likes: 5})
    })
    test('author with most likes, multi blog', () => {
        const result=listHelper.mostLikes(multiblog)
        assert.deepStrictEqual(result, {author: 'Dave', likes: 18})
    })

})
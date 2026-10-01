const _ =require('lodash')


const dummy = (blogs) => {
  return 1
}
const totalLikes=(blogs)=>{
    return blogs.reduce((accumulator,currentBlog)=>{
        if(currentBlog){
            //console.log(currentBlog)
            return accumulator + currentBlog.likes
        }
        return accumulator
        
    },0)
}
const favoriteBlog=(blogs) => {
    return blogs.reduce((max , blog) =>blog.likes>max.likes ? blog : max,{likes : 0})

}
const mostBlogs =(blogs) => {
    let allBlogs=blogs
    const grouped=_.groupBy(allBlogs, (blog)=>blog.author)
    const author=_.maxBy(Object.keys(grouped), author => grouped[author].length)
    return {
        author: author,
        blogs: grouped[author].length
    }

}

const mostLikes = (blogs) => {
    let allBlogs=blogs
    const grouped=_.groupBy(allBlogs, (blog)=>blog.author)
    const author=_.maxBy(Object.keys(grouped), author => grouped[author].reduce((totalLikes,blog)=>totalLikes+blog.likes))
    return {
        author: author,
        likes: totalLikes(grouped[author])
    }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}
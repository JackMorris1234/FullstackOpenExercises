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

module.exports = {
  dummy, totalLikes
}
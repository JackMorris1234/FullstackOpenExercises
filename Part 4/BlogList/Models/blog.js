const mongoose=require('mongoose')

let blogModel=''
let userModel=''
if(process.env.NODE_ENV=='test'){
  blogModel='testBlog'
  userModel='testUser'
}else{
  blogModel='Blog'
  userModel='User'
}

const blogSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true

  },
  author: String,
  url:{
    type:String,
    required:true

  },
  likes:{
    type:Number,
    default:0
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:`${userModel}`,
    required:true
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model(blogModel, blogSchema)

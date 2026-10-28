const mongoose = require('mongoose')

let blogModel=''
let userModel=''
if(process.env.NODE_ENV=='test'){
  blogModel='testBlog'
  userModel='testUser'
}else{
  blogModel='Blog'
  userModel='User'
}
const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    minlength:3,
    unique:true
  },
  name: String,
  passwordHash:{
    type:String,
    required:true,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: `${blogModel}`
    }
  ],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // the passwordHash should not be revealed
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model(userModel , userSchema)

module.exports = User
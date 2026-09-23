const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@fullstackopen1.rvqqtjw.mongodb.net/?appName=FullStackOpen1`
mongoose.set('strictQuery',false)
mongoose.connect(url, { family: 4 })
const PhoneEntrySchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Entry = mongoose.model('Entry', PhoneEntrySchema)

if (process.argv.length === 3) {
    Entry
    .find({})
    .then(result => {
        console.log("PhoneBook: ")
        result.forEach(entry => {
        console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
    })  
}else if(process.argv.length==5){
    const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4],
    })

    entry
    .save()
    .then(result => {
        console.log(`Added ${entry.name} number ${entry.number} to database!`)
        mongoose.connection.close()
    })
}










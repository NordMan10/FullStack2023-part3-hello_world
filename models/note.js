const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

var date = new Date()
var hours = date.getHours()
var minutes = "0" + date.getMinutes()
var seconds = "0" + date.getSeconds() 

// Will display time in 10:30:23 format 
var formattedTime = hours + ':' + minutes + ':' + seconds;
console.log(formattedTime)


console.log('connecting to', url)

mongoose.connect(url).then(result => {
  console.log('connected to MongoDB')
})
.catch((error) => {
  console.log('error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    minLength: 5,
    required: true
  },
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Note', noteSchema)
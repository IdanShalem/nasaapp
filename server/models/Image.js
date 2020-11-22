const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema ({
    _id: String,
    title: String,
    imgUrl: String,
    description: String,
})

const Image = mongoose.model('image' , imageSchema)

module.exports = Image
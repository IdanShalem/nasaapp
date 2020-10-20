const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const userSchema = new Schema({
    email: {
        unique: true,
        type: String,
        required: true, 
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Invalid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Invalid password - cannot contain "password"');
            }
        }
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Invalid name - cannot contain Numbers')
            }
        }
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        validate(value){
            if(!validator.isAlpha(value)){
                throw new Error('Invalid name - cannot contain Numbers')
            }
        }
    }
})


userSchema.virtual('images', {
    ref: 'Image',
    localField: '_id',
    foreignField: 'user'
})


const User = mongoose.model('User', userSchema)

module.exports = User
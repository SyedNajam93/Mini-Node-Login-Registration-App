const mongoose = require('mongoose');
const Schema  = mongoose.Schema;

const UserSchema = new Schema({

email: {
type: String,
required:true,
unique:true,
trim:true,
minLenght:3
},

password:{

type:String,
required:true,
minLenght:5
}

});// end of user model 

module.exports = mongoose.model('User', UserSchema)


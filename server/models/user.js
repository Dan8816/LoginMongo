const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    first_name: {type: String, required: [true, "first name field is required"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true}, 
    last_name: {type: String, required: [true, "last name field is required"], match: [/^[a-zA-Z]+$/, 'is invalid'], index: true},
    email: {type: String, lowercase: true, required: [true, "email is required"], match :[/\S+@\S+\.\S+/, 'is invalid'], index: {unique: true}},
    birthday: {type: Date, required: [true, "birthday is required"]},
    password: {type: String, required: [true, "password is required"]}
   });
   UserSchema.pre('save', function(next) {
       var user = this;
       bcrypt.hash(this.password, 10, function(err, hash){
           if(err){
               return next(err);
           }
           user.password = hash;
           next();
       })
   });
   UserSchema.methods.comparePassword = function(LoginPassword, callback){
       bcrypt.compare(LoginPassword, this.password, function(err, isMatch){
           if (err) return cb(err);
           callback(null, isMatch);
       })
   }
var User = mongoose.model('User', UserSchema);
module.exports = User;
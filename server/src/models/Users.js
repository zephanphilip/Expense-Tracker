const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const validator = require('validator');



const Schema = mongoose.Schema

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true}, 
    name: { type: String, required: true},
    email: { type: String, required: true},
   
    block: { type: Boolean, required: true, default: false},
});



// static signup method
UserSchema.statics.signup = async function(username, password, name, email) {

    //validation
    if (!username || !password   || !name|| !email){
        throw Error('all fields must be entered')
    }
    
    if(!validator.isStrongPassword(password)){
        throw Error('password must be strong')
    }

    const exists = await this.findOne({ username })


    if (exists) {
        throw Error("username already exists")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({ username, password: hash , name, email})

    return user

}

//static login method
UserSchema.statics.login = async function(username, password){
    //validation
    if (!username || !password){
        throw Error('all fields must be entered')
    }

    const user = await this.findOne({ username })


    if (!user) {
        throw Error("user doesn't exists")
    }

    const match = await bcrypt.compare(password,user.password)

    if(!match){
        throw Error('incorrect password')
    }

    return user
}





module.exports = mongoose.model("User", UserSchema);
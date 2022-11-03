const mongoose = require("../config/mongodb")
const bcrypt = require("bcrypt")
const validators = require("../utils/validators.js")

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        validate:{
            validator:function(value){
                return validators.isGoodPassword(value)
            },
            message:"El {PATH} no cumple con los requirimientos"    
        }
    }

})
usersSchema.pre("save", function(next){
    this.password = bcrypt.hashSync(this.password,10)
    next()
})

module.exports = mongoose.model("users", usersSchema)
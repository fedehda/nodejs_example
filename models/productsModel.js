const mongoose = require("../config/mongodb")
const mongoosePaginate = require("mongoose-paginate-v2")


const productsSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "El campo {PATH} es obligatorio"],
        minLength: 3

    },
    price: {
        type: Number,
        minLength:0
    },

    description: String,
    quantity: Number,
    category: {
        type: mongoose.Schema.ObjectId,
        ref:"categories",
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref:"users",
    },
    starred: Boolean,
    sku: String,

})


productsSchema.plugin(mongoose.mongoosePaginate)
module.exports = mongoose.model("products", productsSchema)
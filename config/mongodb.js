const mongoose = require("mongoose")
const mongoosePaginate = require("mongoose-paginate-v2")
const enviroment = require("./enviroments")
console.log("enviroment",enviroment)

mongoose.connect(`mongodb://${enviroment.dbHost}/${enviroment.dbName}`, function(error){
    if(error){
        throw error
    }else{
        console.log("Conectado a Mongo DB")
    }
})

mongoosePaginate.paginate.options={
    limit:10
}

mongoose.mongoosePaginate=mongoosePaginate;
module.exports = mongoose;
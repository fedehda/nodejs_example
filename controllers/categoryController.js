const categoryModel = require("../models/categoryModel")

module.exports={
    getCategory: async function(req,res,next) {
        try{
            const category = await categoryModel.find()
            res.json(category)
        }catch(e){
            res.json(e)
        }
    },

    create: async function(req,res,next) {
        try{
            const category = new categoryModel({
                name: req.body.name
            })
            const document = await category.save()
            res.status(201).json(document)
        }catch(e){
            e.status = 400
            next(e)
        }
    }
}
const productsModel = require("../models/productsModel")


module.exports={
    
    getAll: async function(req, res, next) {
        console.log("query", req.query.buscar)
        try{
            let queryString = {}
            if(req.query.buscar){
                queryString={name:{$regex:`.*${req.query.buscar}.*`,$options:"i"}}
            }
            
            const products = await productsModel.find(queryString).populate("category")

            res.status(200).json(products)
        }catch(e){
            res.json(e)
        }
      },

//************//

    getPaginate: async function(req, res, next) {
        try{
            let queryString = {}
            if(req.query.buscar){
                queryString={name:{$regex:".*${req.query.buscar}.*",$options:"i"}}
            }
            const products = await productsModel.paginate(queryString, {
                limit:req.query.limit || 2,
                sort:{price:1},
                //populate:"categories",
                page: req.query.page || 1
            })

            res.status(200).json(products)
        }catch(e){
            res.json(e)
        }
    },

//************//

      getByID: async function(req,res,next){
        console.log("params", req.params, req.params.id)
        try{
            const product = await productsModel.findById(req.params.id)
            res.json(product)
        }catch(e){
            res.json(e)
        }
      },

//************//  

      getStarred: async function(req,res,next){
        try{
            const starredProducts = await productsModel.find({starred: true}).populate()
            res.json(starredProducts)
        }catch(e){
            res.json(e)
        }
      },

//************//  

      create: async (req,res,next)=>{
        console.log(req.body, req.body.name)
        try{
            const product = new productsModel({
                name: req.body.name,
                price: req.body.price,
                description: req.body.description,
                quantity: req.body.quantity,
                category: req.body.category,
                starred: req.body.starred,
                sku: req.body.sku,
                userId: req.body.userId,
            })
            const document = await product.save()
            res.status(201).json(document)
            
        }catch(e){
            e.status = 400
            next(e)        
        }

      },

//************//  
   
      update: async function(req,res,next){
        console.log("params", req.params, req.params.id)
        console.log(req.body, req.body.name)
        try{
            const document = await productsModel.updateOne({_id:req.params.id}, req.body)
            res.json(document)
        }catch(e){
            res.json(e)
        }
      
      },

//************//  
 
      delete: async function(req,res,next){
        console.log(req.params, req.params.id)
        try{
            const document = await productsModel.deleteOne({_id:req.params.id}, req.body)
            res.json(document)
        }catch(e){
            res.json(e)
        }
      }
}
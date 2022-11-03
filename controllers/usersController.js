const usersModel = require("../models/usersModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports={
    

      create: async (req,res,next)=>{
        console.log(req.body, req.body.name)
        try{
            const users = new usersModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,

            })
            const document = await users.save()
            res.status(201).json(document)
            
        }catch(e){
            e.status = 400
            next(e)        
        }

      },
      login: async function(req, res, next) {
        try{
            const user = await usersModel.findOne({email:req.body.email})
            if(!user){
                res.json({error: true, message:"Email incorrecto"})
                return
            }
            if(bcrypt.compareSync(req.body.password, user.password)){
                const token = jwt.sign({userId:user._id},req.app.get("secretKey"), {expiresIn:"24h"})
                res.json({token})
            }else{
                res.json({error:true, message:"Contraseña incorrecta"})
            }
        }catch(e){
            next(e)
        }
      },
    }
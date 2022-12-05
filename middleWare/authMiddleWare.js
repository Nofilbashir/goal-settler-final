const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UsersModels')


const protectRoute =asyncHandler(async(req, res, next)=>{

    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            //get token form headers
            token = req.headers.authorization.split(' ')[1]

            //verify the token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            console.log(decoded)

            //get user from the token
            req.user = await UserModel.findById(decoded.id).select('-password')
            console.log(req.user,'req.user')

            next() 

        }catch(err){
            console.log(err)
            res.status(401)
            throw new Error("Not Authorized")

        }
    }

    if(!token){
        res.status(401)
        throw new Error("Not Authorized, No token")

    }

})


module.exports = protectRoute
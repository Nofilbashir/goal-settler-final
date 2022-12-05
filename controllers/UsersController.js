const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const UserModel = require('../models/UsersModels')

// ==================Register User ======================

const registerUser = asyncHandler( async(req, res)=>{
    const {name, email,password} = req.body

    if(!name || !email || !password){
        res.status(400)
        throw new Error('Please provide email, name and password')
    }

    //check if user exits
    const userExists = await UserModel.findOne({email})

    if(userExists){
    res.status(404)
    throw new Error('User Already Exists')
    }else{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)
        const newUser = await UserModel.create({
            name:name,
            email:email,
            password:hashedPassword
        })
        if(newUser){
            res.status(200).json({
            message:'success',
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            token:generateToken(newUser._id)
        })
        }else{
            res.status(400)
            throw new Error('Invalid User Data')
        }

    }
})






// ==================Login User ======================


const loginUser = asyncHandler( async(req, res)=>{

    const {email,password}= req.body
    const userExists = await UserModel.findOne({email})

    if(userExists && (await bcrypt.compare(password, userExists.password))){
        res.status(200).json({
        message:'success',
        _id:userExists._id,
        name:userExists.name,
        email:userExists.email,
        token:generateToken(userExists._id)
    })
        
    }else{
        res.status(400)
        throw new Error('Invalid credentails')
    }

})




// ==================Get User Data ======================

const getUser = asyncHandler( async(req, res)=>{
    res.status(200).json(req.user)
})



// generate Token function

const generateToken = (id) =>{
    return jwt.sign({ id }, process.env.JWT_SECRET, {expiresIn:'30d'})
}

module.exports = {registerUser, loginUser, getUser}
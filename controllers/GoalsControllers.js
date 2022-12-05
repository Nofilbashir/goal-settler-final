const asyncHander = require('express-async-handler')
const GoalsModels = require('../models/GoalsModels')

const goalsModel = require('../models/GoalsModels')
const UserModel = require('../models/UsersModels')




// ==================Get API======================
const getAllGoals = asyncHander( async(req,res)=>{
    const AllGoals = await goalsModel.find({ user: req.user.id})
    res.status(200).json(AllGoals)
})



// ==================POST API======================


const createGoal = asyncHander( async(req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw new Error ('Please Add Text Field')
     }
     else{
       const goal = await goalsModel.create({text:req.body.text, user:req.user.id})
       res.status(200).json(goal)
     }
})




// ==================Update API======================

const updateGoal = asyncHander( async(req,res)=>{
    const newData = req.body
    const userExists = await UserModel.findById(req.user.id) 

    //check for user
    if(!userExists){
        res.status(401)
        throw new Error('User Not Found')
    }
    else{
        const goalToBeUpdate = await GoalsModels.findById(req.params.id)
        if (!req.user){
            res.status(401)
            throw new Error('User Not Found')
        }
        if (!goalToBeUpdate){
            res.status(400)
            throw new Error('Goal Not Found')
        }
        if(goalToBeUpdate.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User Not Authorized')
        }else{
            const updatedGoal = await goalsModel.findByIdAndUpdate(req.params.id ,newData, {new:true})
            if(!updatedGoal){
                res.status(404)
                throw new Error("Goal Not Found")
            }else{
                res.status(200).json({message:`success`, data: updatedGoal})
                }
            }
    }
    
})







// ==================Delete Single API======================



const deleteSingleGoal = asyncHander( async(req,res)=>{

    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User Not Found')
    }
    else{
        const goalToBeDeleted = await GoalsModels.findById(req.params.id)
        if (!goalToBeDeleted){
            res.status(400)
            throw new Error('Goal Not Found')
        }
        if(goalToBeDeleted.user.toString() !== req.user.id){
            res.status(401)
            throw new Error('User Not Authorized')
        }else{
            const deletedGoal = await goalsModel.findByIdAndDelete(req.params.id)
            if(!deletedGoal){
                res.status(404)
                throw new Error("Goal Not Found")
            }else{
                res.status(200).json(deletedGoal)
            }

        }
    }
    
})



// ==================Delete All API======================

const deleteAllGoals =asyncHander( async(req,res)=>{

    const deletedGoal = await goalsModel.deleteMany({})

    res.status(200).json({message:`success`})

})






module.exports = {getAllGoals,createGoal,updateGoal,deleteAllGoals,deleteSingleGoal}
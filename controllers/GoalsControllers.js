const asyncHander = require('express-async-handler')

const goalsModel = require('../models/GoalsModels')




// ==================Get API======================
const getAllGoals = asyncHander( async(req,res)=>{
    const AllGoals = await goalsModel.find({})
    res.status(200).json({message:'success', data:AllGoals})
})



// ==================POST API======================


const createGoal = asyncHander( async(req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw new Error ('Please Add Text Field')
     }
     else{
       const goal = await goalsModel.create(req.body)
       res.status(200).json({message:'success', data:goal})
     }
})




// ==================Update API======================

const updateGoal = asyncHander( async(req,res)=>{
    const newData = req.body
    const updatedGoal = await goalsModel.findByIdAndUpdate(req.params.id ,newData, {new:true, overwrite:true})
    if(!updatedGoal){
        res.status(404)
        throw new Error("Goal Not Found")
    }else{
        res.status(200).json({message:`success`, data: updatedGoal})

    }
})







// ==================Delete Single API======================

const deleteSingleGoal = asyncHander( async(req,res)=>{
    const deletedGoal = await goalsModel.findByIdAndDelete(req.params.id)
    if(!deletedGoal){
        res.status(404)
        throw new Error("Goal Not Found")
    }else{
        res.status(200).json({message:`success`, data: deletedGoal})
    }
})








// ==================Delete All API======================

const deleteAllGoals =asyncHander( async(req,res)=>{

    const deletedGoal = await goalsModel.deleteMany({})

    res.status(200).json({message:`success`})

})






module.exports = {getAllGoals,createGoal,updateGoal,deleteAllGoals,deleteSingleGoal}
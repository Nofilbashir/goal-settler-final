const asyncHander = require('express-async-handler')




// ==================Get API======================
const getAllGoals = asyncHander( async(req,res)=>{
    res.status(200).json({message:'get all goals api'})
})



// ==================POST API======================


const createGoal = asyncHander( async(req,res)=>{
    if(!req.body.text){
        res.status(404)
        throw new Error ('Please Add Text Field')
     }
     else{
        res.status(200).json({message:'Creat goals api', data:req.body})

     }
})




// ==================Update API======================

const updateGoal = asyncHander( async(req,res)=>{
    res.status(200).json({message:`Update goals api for id: ${req.params.id}`})
})







// ==================Delete Single API======================

const deleteSingleGoal = asyncHander( async(req,res)=>{
    res.status(200).json({message:`delete single goals api of id: ${req.params.id}`})
})








// ==================Delete All API======================

const deleteAllGoals =asyncHander( async(req,res)=>{
    res.status(200).json({message:'Delete all goals api'})
})






module.exports = {getAllGoals,createGoal,updateGoal,deleteAllGoals,deleteSingleGoal}
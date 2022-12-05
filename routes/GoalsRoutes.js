const express = require('express')
const router = express.Router()
const protectRoute = require('../middleWare/authMiddleWare')
const {getAllGoals,createGoal,updateGoal,deleteAllGoals,deleteSingleGoal} = require('../controllers/GoalsControllers')

router.get('/', protectRoute,getAllGoals)
router.post('/', protectRoute,createGoal)
router.put('/:id', protectRoute,updateGoal)
router.delete('/', protectRoute,deleteAllGoals)
router.delete('/:id', protectRoute,deleteSingleGoal)

module.exports = router
const express = require('express')
const router = express.Router()
const {getAllGoals,createGoal,updateGoal,deleteAllGoals,deleteSingleGoal} = require('../controllers/GoalsControllers')

router.get('/', getAllGoals)
router.post('/', createGoal)
router.put('/:id', updateGoal)
router.delete('/', deleteAllGoals)
router.delete('/:id', deleteSingleGoal)

module.exports = router
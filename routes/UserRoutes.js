const express = require('express')
const router = express.Router()
const {registerUser,loginUser,getUser} = require('../controllers/UsersController')
const protectRoute = require('../middleWare/authMiddleWare')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protectRoute, getUser)



module.exports = router
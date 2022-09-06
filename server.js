const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const GaolsRouter = require('./routes/GoalsRoutes')
const {errorHandler} = require('./middleWare/ErrorMiddleWare')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/api/goals', GaolsRouter)
app.use(errorHandler)


app.listen(port , ()=>console.log(`server running on port ${port}`))


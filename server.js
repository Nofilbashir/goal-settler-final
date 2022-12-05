const express = require('express')
const cors = require('cors')
const path = require('path')
const color = require('colors')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000
const GaolsRouter = require('./routes/GoalsRoutes')
const UserRouter = require('./routes/UserRoutes')
const {errorHandler} = require('./middleWare/ErrorMiddleWare')
const connectDB = require('./DB/DB')




const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())


//routes
app.use('/api/goals', GaolsRouter)
app.use('/api/users', UserRouter)

//serve Frontend

if(process.env.NODE_ENV=== 'production'){
    app.use(express.static(path.join(__dirname,'./build')))
    app.get('*', (req,res)=>res.sendFile(path.resolve(__dirname,'./','build','index.html')))
}else{
    app.get('/',(req,res)=>res.send('server Running in Developemet Mode'))
}

app.use(errorHandler)


const start = async()=>{
    await connectDB()
    app.listen(port , ()=>console.log(`server running on port ${port}`))
}

start()
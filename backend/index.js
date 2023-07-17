import connectToMongo from './mongodb.js'
import express from 'express'
import cors from 'cors'
import authRoutes from './routes/auth.js'

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

// routes 
app.use('/api/auth',authRoutes)

app.listen(port, ()=>{
    console.log(`listening to http://localhost:${port}`)
})
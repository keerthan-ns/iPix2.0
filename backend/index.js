import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

import connectToMongo from './mongodb.js'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/posts.js'
import userRoutes from './routes/user.js'

connectToMongo()

const app = express()
const port = 5000

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true,
    }
))
app.use(cookieParser())
app.use(express.json())

// routes 
app.use('/api/auth',authRoutes)
app.use("/posts",postRoutes)
app.use("/user",userRoutes)

app.listen(port, ()=>{
    console.log(`listening to http://localhost:${port}`)
})
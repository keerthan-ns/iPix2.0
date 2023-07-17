import connectToMongo from './mongodb.js'
import express from 'express'
import cors from 'cors'

connectToMongo()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.listen(port, ()=>{
    console.log(`listening to http://localhost:${port}`)
})
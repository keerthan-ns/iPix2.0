import jwt from 'jsonwebtoken'
import 'dotenv/config'

// eslint-disable-next-line no-undef
const JWT_SECRET = process.env.JWT_SECRET


const fetchUser = async (req,res,next)=>{
    const token = req.cookies.authtoken;

    if (!token)
        return res.status(401).send("Access denied....");
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user = data.user
        next()
    } catch (error) {
        res.status(401).send({message: "Unauthorised request"})
    }
}

export default fetchUser
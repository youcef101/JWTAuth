import express from 'express'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import userRouter from './routes/user.js'
import refreshRouter from './routes/refresh.js'
import cors from 'cors'
//env config
dotenv.config()

//app config
const app = express()
const port = process.env.PORT || 8001

//middlewares
app.use(express.json())
app.use(cors())
app.use('/api/auth/', authRouter)
app.use('/api/user/', userRouter)
app.use('/api/token/', refreshRouter)

//listen server
app.listen(port, () => {
    console.log(`server listen on localhost:${port}`)
})

import express from 'express'
//import Jwt from 'jsonwebtoken'
import users from '../data/users.js'
import { generateAccessToken, generateRefreshToken, refreshTokens, verify } from '../interceptors.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from auth route!')
})

//login
router.post('/login', (req, res) => {
    const user = users.find(user => {
        return user.username === req.body.username && user.password === req.body.password
    })
    if (user) {
        let accessToken = generateAccessToken(user)
        let refreshToken = generateRefreshToken(user)
        refreshTokens.push(refreshToken)
        res.status(200).send({
            id: user.id,
            user: user.username,
            isAdmin: user.isAdmin,
            accessToken: accessToken,
            refreshToken: refreshToken

        })
    } else {
        res.status(400).send(`user not found!`)
    }
})

//logout
router.post('/logout', verify, (req, res) => {
    const refresh_token = req.body.refreshToken
    refreshTokens.filter(token => token !== refresh_token)
    //console.log(refreshTokens)
    res.status(200).send('you Logged out!')
})

export default router
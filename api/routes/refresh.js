import express from 'express'
import { refreshTokens, generateAccessToken, generateRefreshToken } from '../interceptors.js'
import jwt from 'jsonwebtoken'
const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from refresh router !')
})

//refresh token
router.post('/refresh', (req, res) => {
    let refreshToken = req.body.refreshToken
    if (!refreshToken) return res.status(401).send('token does not exists!')
    if (!refreshTokens.includes(refreshToken)) { return res.status(401).send('you are not authenticated!') }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY, (err, user) => {
        err && console.log(err);
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)
        let newAccessToken = generateAccessToken(user)
        let newRefreshToken = generateRefreshToken(user)
        refreshTokens.push(newRefreshToken)
        //console.log(refreshTokens)
        res.status(200).send({ accessToken: newAccessToken, refresh_token: newRefreshToken })
    })
})

export default router
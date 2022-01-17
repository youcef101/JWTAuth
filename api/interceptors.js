import jwt from 'jsonwebtoken'

export let refreshTokens = []
export const verify = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (authHeader) {
        const accessToken = authHeader.split(' ')[1]
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).send('token is not valid!')
            }
            req.user = user
            next();
        })
    } else {
        res.status(403).send('user not authenticated!')
    }

}

export const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '10s' })
}

export const generateRefreshToken = (user) => {
    return jwt.sign({ id: user.id, username: user.username, isAdmin: user.isAdmin }, process.env.REFRESH_TOKEN_SECRET_KEY)
}


import express from 'express'
import { verify } from '../interceptors.js'
import users from '../data/users.js'

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).send('hello from user route!')
})

//delete account
router.delete('/delete/:userId', verify, (req, res) => {
    //console.log(req.user)
    if (req.user.id === req.params.userId || req.user.isAdmin === true) {
        res.status(200).send('user deleted successfully!')
    } else {
        res.status(401).send('you are not allowed to delete this account !')
    }
})

//get all users except current user
router.get('/:userId/all', (req, res) => {
    const users_account = users.filter(user => user.id != req.params.userId && user.isAdmin === false)
    res.status(200).send(users_account)
})

export default router
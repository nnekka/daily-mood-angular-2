import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import config from '../utils/config.js'

export const getTokenFromRequest = async(req, res, next) => {

    let token

    if (req.headers.authorization && req.headers.authorization.toLowerCase().startsWith('bearer ')) {
        try {
            const token = req.headers.authorization.substring(7)
            const decodedToken = jwt.verify(token, config.SECRET)
            req.user = await User.findById(decodedToken.id).select('-password')
            next()
        }
        catch (e) {
            console.error(e.message)
            res.status(401).json({errors: [{msg: 'Invalid token'}]})
        }
    } else {
        console.error('No token in headers'.red)
        res.status(401).json({ errors: [{msg: 'No token in headers'}] })
    }
}

const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

/**
 * 
 * @name authMiddleware 
 * @description This middleware is used to protect routes that require authentication. It checks for the presence of a valid JWT token in the cookies and verifies it. If the token is valid, it allows the request to proceed, otherwise it returns an unauthorized error.
 */

async function authMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    const blacklistedToken = await blacklistModel.findOne({ blacklistedToken: token })
    if (blacklistedToken) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    }
    catch(err){
        return res.status(401).json({ message: "Unauthorized" })
    }
}

module.exports = authMiddleware;
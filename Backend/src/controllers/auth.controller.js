const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const blacklistModel = require("../models/blacklist.model")

/**
 * @name registerUser
 * @description Register a new user expects username, email and password in the request body
 * @route POST /api/auth/register
 * @access Public
 */

async function registerUser(req, res) {
    const {username, email, password} = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const existingUser = await userModel.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = jwt.sign(
        { id:user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
    )

    res.cookie("token", token)

    res.status(201).json({ message: "User registered successfully", 
        user: { id: user._id, username: user.username, email: user.email } })

}

/**
 * @name loginUser
 * @description Login an existing user expects email or username and password in the request body
 * @route POST /api/auth/login
 * @access Public
 */

async function loginUser(req, res) {
    const {email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const isValidUser = await bcrypt.compare(password, user.password)

    if (!isValidUser) {
        return res.status(400).json({ message: "Invalid credentials" })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.cookie("token", token)

    res.status(200).json({ message: "User logged in successfully", user: { id: user._id, username: user.username, email: user.email } })
}

/**
 * @name logoutUser
 * @description Logout a user by blacklisting the token and clearing the cookie
 * @route GET /api/auth/logout
 * @access Public
 */

async function logoutUser(req, res) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(400).json({ message: "No token provided" })
    }

    await blacklistModel.create({ blacklistedToken: token })

    res.clearCookie("token")

    res.status(200).json({ message: "User logged out successfully" })
}

/**
 * @name getMe
 * @description Get the logged in user's details and checks if the token is blacklisted or not
 * @route GET /api/auth/get-me
 * @access Private
 */

async function getMe(req, res) {
    const token = req.cookies.token;
    const user = await userModel.findById(req.user.id).select("-password")

    if(!user){
        return res.status(404).json({ message: "User not found" })
    }

    return res.status(200).json({ message: "User details retrieved successfully", user })

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
}

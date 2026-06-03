const { Router } = require("express");
const authController = require("./../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");


const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUser);

/**
 * @route POST /api/auth/login
 * @description Login a user expects username  and password in the request body
 * @access Public
 */
authRouter.post("/login", authController.loginUser);


/**
 * @route GET /api/auth/logout
 * @description Logout a user
 * @access Public
 */
authRouter.get("/logout", authController.logoutUser);

/**
 * @route GET /api/auth/get-me
 * @description Get the logged in user's details
 * @access Private  
 */

authRouter.get("/get-me", authMiddleware,authController.getMe);

module.exports = authRouter;

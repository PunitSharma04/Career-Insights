const express = require("express");
const cookieParser = require("cookie-parser")
const cors = require("cors");



const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL ,
    credentials: true,
}));

app.get("/", (req, res) => {
    res.send("Career Insights API is running 🚀");
});

/**
 * @Router /api/auth
 * @description This is the auth route which handles all the authentication related routes like register and login
 */

const authRouter = require("./routes/auth.route");
app.use("/api/auth",authRouter)

/**
 * @Router /api/interview
 * @description This is the interview route which handles interview report related routes
 */

const interviewRouter = require("./routes/interview.route")
app.use("/api/interview",interviewRouter)



module.exports=app;

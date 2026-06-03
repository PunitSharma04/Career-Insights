const {Router} = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")

const interviewRouter = Router();

/**
 * @route POST api/interview/
 * @description generate new interview report  on the basis of  user self description , resume pdf and job description 
 * @access private
 */

interviewRouter.post("/",authMiddleware,upload.single("resume"),interviewController.generateInterviewReportController)

module.exports = interviewRouter
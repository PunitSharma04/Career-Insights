const mongoose = require("mongoose");

/**
 * self description : ""
 * job description : ""
 * resume text:""
 * match score :number
 * technical questions :[
 *                      {
 *                          question:"",
 *                          intention :"",
 *                          answer:""
 *                      }
 * ]
 * behavioral questions:[
 *                      {
 *                          question:"",
 *                          intention :"",
 *                          answer:""
 *                      }
 * ]
 * skill gaps:[
 *              skill:"",
 *              severity:{
 *                          type:""
 *                          enum:["low","mid","high"]
 *}
 * ]
 * preparation plan :[
 *                      day:number
 *                      focus:""
 *                      tasks:[""]
 * ]
 */

const technicalQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "question is required"],
        },
        intention: {
            type: String,
            required: [true, "intention is required"],
        },
        answer: {
            type: String,
            required: [true, "answer is required"],
        },
    },
    {
        _id: false,
    },
);

const behavioralQuestionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "question is required"],
        },
        intention: {
            type: String,
            required: [true, "intention is required"],
        },
        answer: {
            type: String,
            required: [true, "answer is required"],
        },
    },
    {
        _id: false,
    },
);

const skillGapSchema = new mongoose.Schema(
    {
        skill: {
            type: String,
            required: [true, "skill is required"],
        },
        severity: {
            type: String,
            enum: ["low", "medium", "high"],
            required: [true, "severity is required"],
        },
    },
    {
        _id: false,
    },
);

const preparationPlanSchema = new mongoose.Schema(
    {
        day: {
            type: Number,
            required: [true, "day is required"],
        },
        focus: {
            type: String,
            required: [true, "focus is required"],
        },
        tasks: [
            {
                type: String,
                required: [true, "task is required"],
            },
        ],
    },
    {
        _id: false,
    },
);

const interviewReportSchema = new mongoose.Schema(
    {
        selfDescription: {
            type: String,
            required: [true, "self description is required"],
        },
        resume: {
            type: String,
        },
        jobDescription: {
            type: String,
        },
        matchScore: {
            type: Number,
            min: 0,
            max: 100,
        },
        technicalQuestions: [technicalQuestionSchema],
        behavioralQuestions: [behavioralQuestionSchema],
        skillGaps: [skillGapSchema],
        preparationPlan: [preparationPlanSchema],
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"users"
        }
    },
    { timestamps: true },
);

const interviewReportModel = mongoose.model("interviewReport",interviewReportSchema)

module.exports = interviewReportModel;

const interviewModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const {generateInterviewReport , generateResumePdf} = require("../services/ai.service");
const mongoose = require("mongoose");

/**
 * @name generateInterviewReportController
 * @description generate report using selfDescription or resume and job description
 * @route POST api/interview/
 * @access private
 */
async function generateInterviewReportController(req, res) {
  try {
    const { selfDescription, jobDescription } = req.body;

    if (!jobDescription) {
      return res.status(400).json({
        message: "jobDescription is required",
      });
    }

    if (!req.file && !selfDescription) {
      return res.status(400).json({
        message: "Either resume file or selfDescription is required",
      });
    }

    let resumeContent = "";

    if (req.file) {
      const pdfData = await new pdfParse.PDFParse(
        new Uint8Array(req.file.buffer),
      ).getText();

      resumeContent = pdfData.text;
    }

    const interviewReportByAi = await generateInterviewReport({
      selfDescription: selfDescription || "",
      jobDescription,
      resume: resumeContent,
    });

    const report = await interviewModel.create({
      selfDescription: selfDescription || "",
      jobDescription,
      resume: resumeContent,
      ...interviewReportByAi,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      report,
    });
  } catch (error) {
    console.error("Generate Interview Report Error:", error);

    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

/**
 * @name getInterviewReportByIdController
 * @description get report by report id
 * @route get api/interview/report/:interviewId
 * @access private
 */
async function getInterviewReportByIdController(req, res) {
  try {
    const { interviewId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(interviewId)) {
      return res.status(400).json({
        message: "Invalid interview ID",
      });
    }

    const report = await interviewModel.findOne({
      _id: interviewId,
      user: req.user.id,
    });

    if (!report) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    res.status(200).json({
      message: "Report fetched successfully",
      report,
    });
  } catch (error) {
    console.log(error)
  }
};

/** 
 * @name getAllInterviewReportOfUserController
 * @description get all interview report of logged in user
 * @route GET api/interview/
 * @access private
 */
async function getAllInterviewReportOfUserController(req, res) {
  try {
    const user = req.user?.id;

    const reports = await interviewModel
      .find({ user })
      .sort({ createdAt: -1 })
      .select("title createdAt matchScore");

    if (reports.length === 0) {
      return res.status(404).json({
        message: "No interview reports found",
        reports: [],
      });
    }

    res.status(200).json({
      message: "Reports fetched successfully",
      count: reports.length,
      reports,
    });
  } catch (error) {
    console.log(error)
  }
}

/**
 * @description Controller to generate resume PDF based on user self description, resume and job description.
 */
async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(interviewReportId)) {
        return res.status(400).json({
            message: "Invalid interview ID",
        });
    }

    const interviewReport = await interviewModel.findById(interviewReportId);

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found.",
        });
    }

    const { resume, jobDescription, selfDescription } = interviewReport;

    if (!jobDescription?.trim()) {
        return res.status(400).json({
            message: "Job description is missing.",
        });
    }

    const pdfBytes = await generateResumePdf({
        resume,
        jobDescription,
        selfDescription,
    });

    const pdfBuffer = Buffer.from(pdfBytes);

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`,
        "Content-Length": pdfBuffer.length,
    });


    res.send(pdfBuffer);
}

module.exports = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportOfUserController , generateResumePdfController };

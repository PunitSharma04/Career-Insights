const interviewModel = require("../models/interviewReport.model");
const pdfParse = require("pdf-parse");
const generateInterviewReport = require("../services/ai.service");

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

    const interviewReport = await interviewModel.create({
      selfDescription: selfDescription || "",
      jobDescription,
      resume: resumeContent,
      ...interviewReportByAi,
      user: req.user.id,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });
  } catch (error) {
    console.error("Generate Interview Report Error:", error);

    return res.status(500).json({
      message: "Failed to generate interview report",
      error: error.message,
    });
  }
}

module.exports = { generateInterviewReportController };

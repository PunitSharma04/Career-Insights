import {
  getAllInterviewReports,
  getInterviewReportById,
  generateInterviewReport,
  generateResumePdf
} from "../services/interview.api";
import { useContext, useEffect } from "react";
import { InterviewContext } from "../interview.context";

export const useInterview = () => {
  const context = useContext(InterviewContext);
  const { report, setReport, loading, setLoading, reports, setReports } =
    context;

  const handleGenerateInterviewReport = async ({
    jobDescription,
    selfDescription,
    resumeFile,
  }) => {
    try {
      setLoading(true);
      const data = await generateInterviewReport({
        jobDescription,
        selfDescription,
        resumeFile,
      });
      setReport(data.report);
      return data.report;
    } catch (error) {
      console.error("Error while generating report", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetInterviewReportById = async (interviewId) => {
    try {
      setLoading(true);
      const data = await getInterviewReportById(interviewId);
      setReport(data.report);
      return data.report;
    } catch (error) {
      console.error("Error while fetching report", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllInterviewReport = async () => {
    try {
      setLoading(true);
      const data = await getAllInterviewReports();
      setReports(data.reports);
      return data.reports;
    } catch (error) {
      console.error("Error while fetching reports", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateResumePdf = async (interviewReportId) => {
    let response = null
    try {
      setLoading(true)
      response = await generateResumePdf( interviewReportId )
      const url = window.URL.createObjectURL(new Blob([response], { type: "application/pdf" }))
      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", `resume_${interviewReportId}.pdf`)
      document.body.appendChild(link)
      link.click()
    }
    catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }



  return {
    report,
    reports,
    loading,
    handleGenerateInterviewReport,
    handleGetInterviewReportById,
    handleGetAllInterviewReport,
    handleGenerateResumePdf
  };
};

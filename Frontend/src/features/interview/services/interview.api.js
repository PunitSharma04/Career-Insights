import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`,
  withCredentials: true,
});

/**
 * @description service to generate interview report based on jon description , self description or resume
 */
export const generateInterviewReport = async ({
  selfDescription,
  jobDescription,
  resumeFile,
}) => {
  if (!jobDescription?.trim()) {
    throw new Error("Job description is required");
  }

  if (!selfDescription?.trim() && !resumeFile) {
    throw new Error("Either self description or resume file is required");
  }

  const formData = new FormData();

  if (selfDescription) {
    formData.append("selfDescription", selfDescription);
  }

  formData.append("jobDescription", jobDescription);

  if (resumeFile) {
    formData.append("resume", resumeFile);
  }

  const response = await api.post("/api/interview", formData);

  return response.data;
};

/**
 * @description service to get interview report based on interview id
 */

export const getInterviewReportById = async (interviewId) => {
  if (!interviewId?.trim()) {
    throw new Error("Interview ID is required");
  }

  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

/**
 * @description service to get all interview report of a logged in user
 */

export const getAllInterviewReports = async () => {
  try {
    const response = await api.get("/api/interview/");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description Service to generate resume pdf based on user self description, resume content and job description.
 */

export const generateResumePdf = async (interviewReportId) => {
  try {
    const response = await api.get(
      `/api/interview/resume/pdf/${interviewReportId}`,
      {
        responseType: "arraybuffer",
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

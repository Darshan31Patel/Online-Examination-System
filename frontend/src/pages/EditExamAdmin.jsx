import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditExamAdmin() {
  const [examData, setExamData] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  const [examName, setExamName] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [progQues, setProgQues] = useState([]);
  const [selectedProgQues, setSelectedProgQues] = useState([]);


  const getData = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8080/admin/exam/getExamById/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = response.data;
      setExamData(data);
      setExamName(data.examName);
      setPassingMarks(data.passingMarks);
      setStartTime(data.startTime);
      setEndTime(data.endTime);
      setSelectedQuestions(data.mcqQues || []);
      setSelectedProgQues(data.programQues?.map((q) => q.quesId) || []);
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };

  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prev) =>
      prev.some((q) => q.questionId === questionId)
        ? prev.filter((q) => q.questionId !== questionId) // Deselect question
        : [...prev, { questionId }] // Select question with questionId
    );
  };

  const handleProgrammingQuestionSelect = (quesId) => {
    setSelectedProgQues((prev) =>
      prev.includes(quesId)
        ? prev.filter((id) => id !== quesId) // Deselect programming question
        : [...prev, quesId] // Select programming question
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formattedProgQues = selectedProgQues.map((quesId) => ({ quesId }));

    const updatedExamData = {
      examName,
      passingMarks,
      startTime,
      endTime,
      mcqQues: selectedQuestions,
      programQues: formattedProgQues,
    };

    console.log("Exam Data to Update:", updatedExamData);

    try {
      // const response = await axios.put(
      //   `http://localhost:8080/admin/exam/updateExam/${id}`,
      //   updatedExamData,
      //   {
      //     headers: { Authorization: `Bearer ${token}` },
      //   }
      // );
      // console.log(response.data);
      // alert("Exam updated successfully!");
      // navigate("/admin/dashboard");
    } catch (error) {
      console.error("Error updating exam:", error);
      alert("Failed to update exam. Please try again.");
    }
  };

  const getQuesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/mcqQues/allQues",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching MCQ questions:", error);
    }
  };

  const getProgQues = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/progQues/allQues",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setProgQues(response.data);
    } catch (error) {
      console.error("Error fetching programming questions:", error);
    }
  };

  useEffect(() => {
    getQuesData();
    getProgQues();
    getData(id); // Fetch existing exam data
  }, [id]);

  const handleClick = () => {
    navigate("/admin/dashboard");
  };

  return (
    <div className="mt-16 flex items-center flex-col w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg">
      <button
        onClick={handleClick}
        className=" inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"  >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
        </svg>
        Back
      </button>

      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-center mb-6 font-bold">Edit Exam Details</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Enter Exam Name"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <input
            type="text"
            placeholder="Enter Passing Marks"
            value={passingMarks}
            onChange={(e) => setPassingMarks(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />

          <div className="flex flex-col mb-4">
            <h3>Enter Start Date-Time</h3>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2"
            />
          </div>

          <div className="flex flex-col mb-4">
            <h3>Enter End Date-Time</h3>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="p-2 border border-gray-300 rounded mb-2"
            />
          </div>

          <div className="mb-4">
            <h3>Select Multiple Choice Questions</h3>
            <div className="max-h-48 overflow-y-auto border p-2 rounded">
              {questions.length > 0 ? (
                questions.map((question) => (
                  <div key={question.questionId} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`question-${question.questionId}`}
                      onChange={() => handleQuestionSelect(question.questionId)}
                      checked={selectedQuestions.some(
                        (q) => q.questionId === question.questionId
                      )}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`question-${question.questionId}`}
                      className="text-sm"
                    >
                      {question.question} ({question.category})
                    </label>
                  </div>
                ))
              ) : (
                <p>No MCQ questions available</p>
              )}
            </div>
          </div>

          <div className="mb-4">
            <h3>Select Programming Questions</h3>
            <div className="max-h-48 overflow-y-auto border p-2 rounded">
              {progQues.length > 0 ? (
                progQues.map((question) => (
                  <div key={question.quesId} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`prog-question-${question.quesId}`}
                      onChange={() =>
                        handleProgrammingQuestionSelect(question.quesId)
                      }
                      checked={selectedProgQues.includes(question.quesId)}
                      className="mr-2"
                    />
                    <label
                      htmlFor={`prog-question-${question.quesId}`}
                      className="text-sm"
                    >
                      {question.question} ({question.difficulty})
                    </label>
                  </div>
                ))
              ) : (
                <p>No programming questions available</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Update Exam
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditExamAdmin;

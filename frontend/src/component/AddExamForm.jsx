import axios from "axios";
import React, { useState, useEffect } from "react";

function AddExamForm() {
  const [examName, setExamName] = useState("");
  const [passingMarks, setPassingMarks] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [questions, setQuestions] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [progQues,setProgQues] = useState([])
  const [selectedProgQues, setSelectedProgQues] = useState([])

 
  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions((prev) =>
        prev.some((q) => q.questionId === questionId)
          ? prev.filter((q) => q.questionId !== questionId) // Deselect question
          : [...prev, { questionId }] // Select question with questionId
    );
  };

  const handleProgrammingQuestionSelect = (quesId) => {
    setSelectedProgQues((prev) =>
      prev.some((q) => q.quesId === quesId)
        ? prev.filter((q) => q.quesId !== quesId) // Deselect question
        : [...prev, quesId] // Select programming question
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const examData = {
      examName,
      passingMarks,
      startTime,
      endTime,
      mcqQues: selectedQuestions,
      programQues: selectedProgQues
    };
    // console.log("Exam Data to Submit:", examData);
    const response = await axios.post("http://localhost:8080/admin/exam/createExam",examData,{
        headers:{
            Authorization: `Bearer ${token}`,
        }
    })
    // console.log(response.data)
    alert("Exam created successfully")
    setExamName("")
    setEndTime("")
    setExamName("")
    setPassingMarks("")
    setProgQues([])
    setQuestions([])
    setSelectedProgQues([])
    setSelectedQuestions([])
  };

  const getQuesData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8080/admin/mcqQues/allQues",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const getProgQues = async()=>{
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/admin/progQues/allQues", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setProgQues(response.data)
        // console.log(response.data); 
                   
    } catch (error) {
        console.log("Error fetching questions");
    }
}

  useEffect(() => {
    getQuesData();
    getProgQues();
  }, []);

  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl text-center mb-6 font-bold">Enter Exam Details</h1>
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
                    <label htmlFor={`question-${question.questionId}`} className="text-sm">
                      {question.question} ({question.category})
                    </label>
                  </div>
                ))
              ) : (
                <p>No questions available</p>
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
                      onChange={() => handleProgrammingQuestionSelect(question.quesId)}
                      checked={selectedProgQues.some(
                        (q) => q.quesId === question.quesId
                      )}
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
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Create Exam
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddExamForm;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../component/CodeEditorComponent/CodeEditor';

function ExamPage() {
  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState({});
  const [programmingAnswers, setProgrammingAnswers] = useState({});
  const [submit, setSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();
  const [handleSubmitData, setHandleSubmitData] = useState(false);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/admin/exam/getExamById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExamData(response.data);
      // console.log(examData);
      
    } catch (error) {
      console.log("Error fetching exam data:", error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setMcqAnswers((prev) => {
      const updatedAnswers = { ...prev };
      updatedAnswers[questionId] = option;
      return updatedAnswers;
    });
  };

  const handleProgrammingAnswer = (quesId, answer) => {
    setProgrammingAnswers((prev) => {
      const updatedAnswers = { ...prev };
      updatedAnswers[quesId] = answer;
      return updatedAnswers;
    });
  };

  const calculateMarks = (mcqAnswers) => {
    const marksPerQues = 4;
    let marks = 0;

    // Calculate marks for MCQ questions
    Object.values(mcqAnswers).forEach((answer) => {
      if (answer?.isCorrect) {
        marks += marksPerQues;
      }
    });

    return marks;
  };

  const handleSubmit = async () => {
    setSubmit(true);
    setHandleSubmitData(true);
  
    try {
      const marks = calculateMarks(mcqAnswers);
      // console.log("Marks:", marks);
  
      const passingMarks = Number(examData.passingMarks);
      // console.log("Passing Marks:", passingMarks);
  
      const status = marks >= passingMarks;
      // console.log("Status (isPassed):", status);
      
      const data = {
        score: marks,
        passed: status,
        exam: examData,
      };
      
  // console.log(data);
  
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/exam/saveMarks", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const submissionData = response.data;
  
      // Prepare MCQ answer data
      const mcqAnswerData = Object.entries(mcqAnswers).map(([key, mcq]) => ({
        ques: examData.mcqQues.find(q => q.questionId === Number(key)),
        selectedOption: mcq,
      }));
  
      // Prepare programming answer data
      const programAnswerData = Object.entries(programmingAnswers).map(([key, program]) => ({
        ques: examData.programQues.find(q => q.quesId === Number(key)),
        ansText: program,
      }));
  
      // console.log("MCQ Answer Data:", mcqAnswerData);
      // console.log("Programming Answer Data:", programAnswerData);
  
      // Save MCQ answers
      try {
        const mcqPayload = {
          mcqAnswers: mcqAnswerData,
          examSubmission: submissionData,
        };
        const mcqResponse = await axios.post("http://localhost:8080/exam/save/mcqAnswer", mcqPayload, {
          headers: {
            "Content-Type": "application/json", 
          },
        });
        // console.log("MCQ answers saved successfully:", mcqResponse.data);
      } catch (mcqError) {
        console.error("Error saving MCQ answers:", mcqError);
      }
  
      // Save programming answers
      try {
        const programPayload = {
          programmingAnswers: programAnswerData,
          examSubmission: submissionData,
        };
        const programResponse = await axios.post("http://localhost:8080/exam/save/programmingAnswer", programPayload, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log("Programming answers saved successfully:", programResponse.data);
      } catch (programError) {
        console.error("Error saving programming answers:", programError);
      }
    } catch (error) {
      console.error("Error saving marks or initializing submission:", error);
    }
  };
  
  

  const calculateTimeLeft = () => {
    const now = new Date();
    const endTime = new Date(examData?.endTime);
    const diffMs = endTime - now;

    if (diffMs <= 0) {
      setTimeLeft("Time's up!");
      setSubmit(true);
      return;
    }

    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

    setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
  };

  const handleHomePage = () => {
    navigate("/student/dashboard");
  };

  useEffect(() => {
    const preventDefaultAction = (e) => e.preventDefault();
    const addEventListeners = () => {
      document.addEventListener('copy', preventDefaultAction);
      document.addEventListener('paste', preventDefaultAction);
      window.addEventListener('keydown', handleKeyDown);
    };
    const removeEventListeners = () => {
      document.removeEventListener('copy', preventDefaultAction);
      document.removeEventListener('paste', preventDefaultAction);
      window.removeEventListener('keydown', handleKeyDown);
    };

    const handleBeforeUnload = (e) => {
      const msg  = "Are you sure you want to leave?"
      e.returnValue = msg
      return msg
    }
    window.addEventListener('beforeunload', handleBeforeUnload);

    const handleKeyDown = (e) => {
      if (e.ctrlKey || e.altKey) {
        e.preventDefault();
      }
      if(e.altKey && e.key === 'Tab'){
        e.preventDefault()
      }
    }
    getData();
    addEventListeners();

    return()=> {
      removeEventListeners();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, []);

  useEffect(() => {
    if (submit && !handleSubmitData) {
      handleSubmit();
    }
  }, [submit, handleSubmitData]);

  useEffect(() => {
    if (examData) {
      calculateTimeLeft();
      const timer = setInterval(() => {
        calculateTimeLeft();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [examData]);

  if (!examData) {
    return <div>Loading...</div>;
  }

  const totalQuestions = (examData.mcqQues?.length || 0) + (examData.programQues?.length || 0);
  const currentQuestion =
    currentIndex < (examData.mcqQues?.length || 0)
      ? examData.mcqQues[currentIndex]
      : examData.programQues[currentIndex - (examData.mcqQues?.length || 0)];

  return (
    <div className="mt-16 flex flex-rows w-full">
      <div className='w-1/4'>
        <h1 className='w-full text-center mb-4 text-lg font-semibold'>Question Status</h1>
          <div className='w-full flex flex-wrap'>
          {
          Array.from({length: totalQuestions},(_,i)=>{
            const isAnswered = i < (examData.mcqQues?.length || 0) ? mcqAnswers[examData.mcqQues[i]?.questionId] : programmingAnswers[examData.programQues[i - (examData.mcqQues?.length || 0)]?.quesId]; 
            return (
              <button key={i} className={`w-12 h-12 text-center flex items-center justify-center border-black rounded m-2 ${isAnswered ? "bg-green-600" : "bg-red-600"} text-white`} onClick={()=>setCurrentIndex(i)}>{i+1}</button>
            )
          })
        }
          </div>
      </div>
      {!submit && (
        <div className="w-3/4 bg-white shadow-md p-6 rounded-lg">
          <h1 className="text-3xl font-bold mb-4 text-center uppercase">
            {examData.examName}
          </h1>
          <div className="text-center text-red-600 font-bold mb-4">
            Time Left: {timeLeft}
          </div>

          <div className="text-center mb-6">
            <h2 className="font-semibold">
              Question {currentIndex + 1} of {totalQuestions}
            </h2>
          </div>

          <div className="h-auto mb-6">
            <p className="mb-3">
              {currentQuestion?.question} (
              {currentQuestion?.category || currentQuestion?.difficulty})
            </p>

            {currentQuestion?.options ? (
              <div>
                {currentQuestion.options.map((option) => (
                  <div key={option.optionId} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.questionId}`}
                      value={option.optionText}
                      checked={mcqAnswers[currentQuestion.questionId]?.optionText === option.optionText}
                      onChange={() =>
                        handleOptionChange(currentQuestion.questionId, option)
                      }
                      className="mr-3"
                    />
                    <label>{option.optionText}</label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-full h-[500px] border rounded">
                <CodeEditor value={programmingAnswers[currentQuestion.quesId] || ""}
                            onChange={(value) => handleProgrammingAnswer(currentQuestion.quesId, value)} />
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setCurrentIndex(currentIndex - 1)}
              disabled={currentIndex === 0}>
              Previous
            </button>

            <button
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => setCurrentIndex(currentIndex + 1)}
              disabled={currentIndex === totalQuestions - 1}>
              Next
            </button>
          </div>
          <div className='text-center mt-6'>
            <button
                className="bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleSubmit}
                disabled={submit}
              >
                Submit
              </button>
          </div>
        </div>
      )}

      {submit && (
        <div className="bg-green-100 text-green-800 border border-green-300 p-6 rounded-lg text-center max-w-md mx-auto">
          <p className="text-xl font-semibold mb-4">Exam Submitted Successfully.</p>
          <p className="text-lg">You scored {calculateMarks(mcqAnswers, programmingAnswers)} marks.</p>
          <button
            className="mt-6 bg-gray-800 text-white py-2 px-4 rounded"
            onClick={handleHomePage}
          >
            Back to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}

export default ExamPage;

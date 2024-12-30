import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CodeEditor from '../component/CodeEditorComponent/CodeEditor';
import { ChakraProvider } from '@chakra-ui/react';

function ExamPage() {
  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState({});
  const [submit, setSubmit] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();
  const [handleSubmitData,setHandleSubmitData] = useState(false)

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/admin/exam/getExamById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setExamData(response.data);
    } catch (error) {
      console.log("Error fetching exam data:", error);
    }
  };

  const handleOptionChange = (questionId, option) => {
    setUserAnswer((prev) => {
      const updatedAnswers = { ...prev };
      updatedAnswers[questionId] = option; 
      return updatedAnswers;
    });
  };

  const handleProgrammingAnswer = (quesId, answer) => {
    setUserAnswer((prev) => {
      const updatedAnswers = { ...prev };
      updatedAnswers[quesId] = answer; 
      return updatedAnswers;
    });
  };

  const calculateMarks = (data) => {
    const marksPerQues = 4;
    let marks = 0;

    Object.values(data).forEach((answer) => {
      if (answer?.isCorrect) {
        marks += marksPerQues;
      }
    });
    return marks;
  };

  const handleSubmit = async () => {
    setSubmit(true);
    setHandleSubmitData(true)
    console.log("Submitted Answers:", userAnswer);
    const marks = calculateMarks(userAnswer);
    const status = marks >= examData.passingMarks; 
    const data = {
      score: marks,
      isPassed: status,
      exam: examData,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:8080/exam/saveMarks", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.log("Error saving marks");
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
    getData();
  }, [id]);

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
      <div className="mt-16 flex flex-col items-center w-full">
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
                      checked={
                        userAnswer[currentQuestion.questionId]?.optionText ===
                        option.optionText
                      }
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
                <CodeEditor value={userAnswer[currentQuestion.quesId] || ""}
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
          <p className="text-xl font-semibold mb-4">
            Your Score : {calculateMarks(userAnswer)}
          </p>
          <button
            onClick={handleHomePage}
            className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Back to Home Page
          </button>
        </div>
      )}
  </div>

  );
}

export default ExamPage;

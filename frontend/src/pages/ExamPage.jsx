import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ExamPage() {
  const { id } = useParams();
  const [examData, setExamData] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer,setUserAnswer] = useState({});
  const [submit,setSubmit] = useState(false);

  const getData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/admin/exam/getExamById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setExamData(response.data);
    //   console.log(response.data);
    } catch (error) {
      console.log("Error fetching exam data");
    }
  };

  const handleOptionChange = (questionId,option) =>{
    setUserAnswer(prev=>({
        ...prev, [questionId]:option
    }))
  }

  const handleProgrammingAnswer = (quesId, answer) => {
    setUserAnswer(prev => ({
      ...prev,
      [quesId]: answer,
    }));
  };

  const handleSubmit =()=>{
    setSubmit(true)
    console.log(userAnswer);
    
  }

  useEffect(() => {
    getData();
    const handleCopy = (e) => {
        e.preventDefault(); 
      };
  
      const handleCut = (e) => {
        e.preventDefault(); 
      };
  
      const handlePaste = (e) => {
        e.preventDefault();
      };
  
      document.addEventListener('copy', handleCopy);
      document.addEventListener('cut', handleCut);
      document.addEventListener('paste', handlePaste);
  }, [id]);

  if (!examData) {
    return <div>Loading...</div>;
  }

  const totalQuestions = (examData.mcqQues?.length || 0) + (examData.programQues?.length || 0);
  const currentQuestion =
    currentIndex < (examData.mcqQues?.length || 0)
      ? examData.mcqQues[currentIndex]
      : examData.programQues[currentIndex - (examData.mcqQues?.length || 0)];

  return (
    <div className='mt-16 flex flex-col items-center w-full'>
      <div className="w-3/4 bg-white shadow-md p-6 rounded-lg">
        <h1 className='text-3xl font-bold mb-4 text-center uppercase'>{examData.examName}</h1>
        <div className="text-center mb-6">
          <h2 className='font-semibold'>Question {currentIndex + 1}</h2>
        </div>
        
        <div className='mb-6 h-48'>
          <p className='mb-3'>{currentQuestion?.question} ({currentQuestion?.category || currentQuestion?.difficulty})</p>

          {currentQuestion?.options ? (
            <div>
              {currentQuestion.options.map((option) => (
                <div key={option.optionId} className="flex items-center mb-2">
                  <input type="radio" name={`question-${currentQuestion.questionId}`} value={option.optionText} 
                  checked = {userAnswer[currentQuestion.questionId]===option}
                  onChange={()=> handleOptionChange(currentQuestion.questionId,option)}
                  className='mr-3'/>
                  <label>{option.optionText}</label>
                </div>
              ))}
            </div>
          ) : (
            <textarea placeholder="Enter your programming answer" className="w-full h-32 border rounded p-2"
            value={userAnswer[currentQuestion.quesId] || ""}
            onChange={(e)=> handleProgrammingAnswer(currentQuestion.quesId,e.target.value)} />
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

        <div className='mt-6 text-center'>
            <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleSubmit}
            disabled={submit}>
                Submit
            </button>
        </div>
      </div>
    </div>
  );
}

export default ExamPage;

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function StudentExam() {

    const [examDetail,setExamDetail] = useState([])
    const navigate = useNavigate()
    const currentTime = new Date()

    const upcomingExam = examDetail.filter(exam=> new Date(exam.endTime)>currentTime)
    const completedExams = examDetail.filter((exam) => new Date(exam.endTime) <= currentTime)

    const getData = async()=>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/student/exam/getAllExamDetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setExamDetail(response.data)
            // console.log(response.data); 
        } catch (error) {
            
        }
    }

    const handleClick =  (exam)=>{
        const currentDateTime = new Date();
        const examEndTime = new Date(exam.endTime);

        if(examEndTime > currentDateTime){
            navigate(`/student/exam/${exam.examId}`)
        }else{
            alert("Exam completed")
        }
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className="ml-64 mt-16 flex flex-col items-center w-full">
    {/* Upcoming Exams Section */}
    {upcomingExam.length > 0 && (
      <div className="w-full flex flex-col items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Upcoming Exams</h2>
        <div className="w-full flex flex-wrap justify-center gap-6 p-4 bg-gray-100">
          {upcomingExam.map((exam) => (
            <div
              key={exam.examId}
              onClick={() => handleClick(exam)}
              className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-700">{exam.examName}</h3>
              <div className="text-gray-600 mb-2">
                <strong>Passing Marks:</strong> {exam.passingMarks}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>MCQ Questions:</strong> {exam.mcqQues?.length || 0}
              </div>
              <div className="text-gray-600">
                <strong>Programming Questions:</strong> {exam.programQues?.length || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Completed Exams Section */}
    {completedExams.length > 0 && (
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Completed Exams</h2>
        <div className="w-full flex flex-wrap justify-center gap-6 p-4 bg-gray-100">
          {completedExams.map((exam) => (
            <div
              key={exam.examId}
              onClick={() => handleClick(exam)}
              className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
            >
              <h3 className="text-xl font-bold mb-4 text-gray-700">{exam.examName}</h3>
              <div className="text-gray-600 mb-2">
                <strong>Passing Marks:</strong> {exam.passingMarks}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>Start Time:</strong> {new Date(exam.startTime).toLocaleString()}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>End Time:</strong> {new Date(exam.endTime).toLocaleString()}
              </div>
              <div className="text-gray-600 mb-2">
                <strong>MCQ Questions:</strong> {exam.mcqQues?.length || 0}
              </div>
              <div className="text-gray-600">
                <strong>Programming Questions:</strong> {exam.programQues?.length || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
  )
}

export default StudentExam

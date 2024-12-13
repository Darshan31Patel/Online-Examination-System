import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function StudentExam() {

    const [examDetail,setExamDetail] = useState([])
    const navigate = useNavigate()

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

    const handleClick =  (id)=>{
        navigate(`/student/exam/${id}`)
        
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className="ml-64 mt-16 flex flex-col items-center w-full">
      <div className="w-full flex flex-wrap justify-center gap-6 p-4 bg-gray-100">
    { examDetail.map((exam) => (
            <div
                key={exam.examId}
                onClick={()=>handleClick(exam.examId)}
                className="bg-white shadow-md rounded-lg p-6 w-80 text-center"
            >
                <h2 className="text-xl font-bold mb-4 text-gray-700">
                    {exam.examName}
                </h2>
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
  )
}

export default StudentExam

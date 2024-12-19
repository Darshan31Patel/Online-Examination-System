import React, { useEffect, useState } from 'react'
import AddExamForm from './AddExamForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ExamManagement() {

    const[addForm,setAddForm] = useState(false) 
    const [examDetail,setExamDetail] = useState([])
    const navigate = useNavigate()

    const getData = async ()=>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/admin/exam/getExamDetails", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setExamDetail(response.data)
            // console.log(response.data);   
        } catch (error) {
            console.log("Error fetching data");
        }
    }

    const handleResult = (examId) =>{
        navigate(`/examResult/${examId}`)
    }

    const handleEditExam = (examId)=>{
        navigate(`/editExam/${examId}`)
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className="ml-64 mt-16 flex flex-col items-center w-full">
      <div className="mb-4">
            <button 
                className="w-32 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                onClick={() => setAddForm(!addForm)}>
                Create Exam
            </button>
        </div>
        <div className="w-full flex justify-center">
            {addForm && <AddExamForm/>}
        </div>
        <div className="w-full flex flex-wrap justify-center gap-6 p-4 bg-gray-100">
    {!addForm &&
        examDetail.map((exam, index) => (
            <div
                key={index}
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
                <div className='mt-2'>
                    <button className="p-2 mr-2 bg-green-600 text-white rounded-md" onClick={()=>handleEditExam(exam.examId)} >Edit Exam</button>
                    <button className="p-2 mr-2 bg-yellow-600 text-white rounded-md" onClick={()=>handleResult(exam.examId)}>View Result</button>
                </div>
            </div>
        ))}
        </div>

    </div>
  )
}

export default ExamManagement

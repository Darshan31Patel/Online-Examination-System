import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ResultPageAdmin() {

    const [resultData, setResultData] = useState([])
    const { id } = useParams()
    const navigate = useNavigate()

    const getData = async(id) => {
        try {
            const response = await axios.get(`http://localhost:8080/exam/result/${id}`)
            setResultData(response.data)
        } catch (error) {
            console.log("Error fetching result data");
        }
    }
    
    const handleClick = () => {
        navigate("/admin/examManagement")
    }

    useEffect(() => {
        getData(id);
    }, [])

    const passedStudents = resultData.filter(item => item.passed);
    const failedStudents = resultData.filter(item => !item.passed);
    const examDetails = resultData.length > 0 ? resultData[0].exam : {};

    return (
        <div className='flex justify-center items-start min-h-screen bg-gray-50'>
        
            <div className="mt-16 flex flex-col items-start w-full max-w-6xl p-6 bg-white shadow-lg rounded-lg">
            
                
                <button
                    onClick={handleClick}
                    className="mb-6 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back
                </button>
                
                {/* Exam Details */}
                {examDetails && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-blue-600">Exam ID: {examDetails.examId}</h2>
                        <h3 className="text-xl font-medium text-gray-700">Exam Name: {examDetails.examName}</h3>
                    </div>
                )}
                
                {/* Passed Students Container */}
                <div>
                    <h2 className="text-xl font-semibold text-green-600 mb-4">Passed Students</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {passedStudents.length > 0 ? (
                            passedStudents.map((item, index) => (
                                <div key={index} className="w-full p-4 mb-4 border border-gray-200 rounded-lg shadow-md">
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Student ID:</strong> {item.student.studentId}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Student Name:</strong> {item.student.name}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Score:</strong> {item.score}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Passed:</strong> Yes
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-lg text-gray-600">No passed students</div>
                        )}
                    </div>
                </div>

                {/* Failed Students Container */}
                <div className="mt-8">
                    <h2 className="text-xl font-semibold text-red-600 mb-4">Failed Students</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                        {failedStudents.length > 0 ? (
                            failedStudents.map((item, index) => (
                                <div key={index} className="w-full p-4 mb-4 border border-gray-200 rounded-lg shadow-md">
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Student ID:</strong> {item.student.studentId}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Student Name:</strong> {item.student.name}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Score:</strong> {item.score}
                                    </div>
                                    <div className="text-md text-gray-600 mt-2">
                                        <strong>Passed:</strong> No
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-lg text-gray-600">No failed students</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ResultPageAdmin

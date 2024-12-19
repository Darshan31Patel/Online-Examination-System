import axios from 'axios'
import React, { useEffect, useState } from 'react'

function StudentExamResult() {

    const [resultData, setResultData] = useState([])

    const getData = async () => {
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get("http://localhost:8080/exam/result/student", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response.data);
            setResultData(response.data)
        } catch (error) {
            console.log("Error fetching result data");
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="ml-64 mt-16 flex flex-col items-center w-full">
            <h1 className="text-3xl font-semibold mb-8">Exam Results</h1>
            <div className='w-full flex flex-wrap justify-center gap-8'>
                {resultData.map((result, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg w-full sm:w-80 md:w-96">
                        <h2 className="text-xl font-semibold text-blue-600 mb-4">{result.exam.examName}</h2>
                        <div className="text-md text-gray-700">
                            <p><strong>Score:</strong> {result.score}</p>
                            <p><strong>Passed:</strong> {result.passed ? "Yes" : "No"}</p>
                            <p><strong>Passing Marks:</strong> {result.exam.passingMarks}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default StudentExamResult

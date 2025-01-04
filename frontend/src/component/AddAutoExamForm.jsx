import axios from 'axios';
import React, { useState } from 'react'

function AddAutoExamForm() {
    const [examName, setExamName] = useState("");
    const [passingMarks, setPassingMarks] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [numberTechnicalQues,setNumberTechnicalQues] = useState("")
    const [numberLogicalQues,setNumberLogicalQues] = useState("")
    const [numberProgrammingQues,setNumberProgrammingQues] = useState("")
    const [numberCodingQues, setNumberCodingQues] = useState("")
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
  
      const examData = {
        examName,
        passingMarks,
        startTime,
        endTime, 
        numberTechnicalQues,
        numberLogicalQues,
        numberProgrammingQues,
        numberCodingQues
      };
  
      try {
        const response = await axios.post("http://localhost:8080/admin/exam/autoExamCreate",examData,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        // console.log(response.data);
        alert("Exam created Successfully")
        setExamName("");
        setPassingMarks("");
        setStartTime("");
        setEndTime("");
        setNumberTechnicalQues("");
        setNumberLogicalQues("");
        setNumberProgrammingQues("");
        setNumberCodingQues("");

        
      } catch (error) {
        console.log("Error creating exam");
        
      }
  
    };

  
    return (
      <div className="flex justify-centerl items-center bg-gray-100">
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
  
            <input
              type="number"
              placeholder="Enter Number of Technical Question"
              value={numberTechnicalQues}
              onChange={(e) => setNumberTechnicalQues(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="number"
              placeholder="Enter Number of Logical Question"
              value={numberLogicalQues}
              onChange={(e) => setNumberLogicalQues(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="number"
              placeholder="Enter Number of Programming Question"
              value={numberProgrammingQues}
              onChange={(e) => setNumberProgrammingQues(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />

            <input
              type="number"
              placeholder="Enter Number of Coding Question"
              value={numberCodingQues}
              onChange={(e) => setNumberCodingQues(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
  
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

export default AddAutoExamForm

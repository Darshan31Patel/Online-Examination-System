import axios from 'axios';
import React, { useState } from 'react'

function AddProgQuesForm() {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // console.log(question + answer + difficulty);
        const token = localStorage.getItem("token");
        const data = {
            question:question, answer:answer, difficulty: difficulty
        }

       await axios.post("http://localhost:8080/admin/progQues/addQues",data,
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
               }
        )

        // console.log(response.data);
        alert("Question added successfully")
        setAnswer("")
        setDifficulty("")
        setQuestion("")
    }

  return (
    <div className='flex justify-center items-center bg-gray-100'>
        <div className='w-full max-w-md p-6 bg-white shadow-md rounded-lg'>
            <h1 className='text-2xl text-center mb-6 font-bold'>Add Question</h1>

            <form onSubmit={handleSubmit} className='space-y-4'>
            {/* Question Input */}
            <input 
                type="text" 
                placeholder='Enter Question' 
                value={question} 
                onChange={(e) => setQuestion(e.target.value)} 
                className='w-full p-2 border border-gray-300 rounded' 
            />

            {/* Answer Input */}
            <input 
                type="text" 
                placeholder='Enter Answer' 
                value={answer} 
                onChange={(e) => setAnswer(e.target.value)} 
                className='w-full p-2 border border-gray-300 rounded' 
            />

            {/* Difficulty Level Select */}
            <select 
                value={difficulty} 
                onChange={(e) => setDifficulty(e.target.value)} 
                className="w-full p-2 border border-gray-300 rounded"
            >
                <option value="">Select Difficulty Level</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
            </select>

            {/* Submit Button */}
            <button 
                type='submit' 
                className='w-full bg-blue-500 text-white p-2 rounded'
            >
                Submit
            </button>
            </form>
        </div>      
    </div>

  )
}

export default AddProgQuesForm

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuesForm from './AddQuesForm';

function QuestionManagement() {
    const [addForm, setAddForm] = useState(false);
    const [questions, setQuestions] = useState([]);

    // Fetch question data
    const getQuesData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/admin/mcqQues/allQues", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setQuestions(response.data);
        } catch (error) {
            console.log("Error fetching questions");
        }
    };

    // Delete question
    const deleteQuestion = async (quesId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8080/admin/mcqQues/delete/${quesId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setQuestions(questions.filter(question => question.questionId !== quesId));
            }
        } catch (error) {
            console.log("Error deleting question");
        }
    };

    // Delete option
    const deleteOption = async (optionId) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.delete(`http://localhost:8080/admin/mcqOption/deleteOption/${optionId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setQuestions(prevQuestions => 
                    prevQuestions.map(question => ({
                        ...question,
                        options: question.options.filter(option => option.optionId !== optionId)
                    }))
                );
            }
        } catch (error) {
            console.log("Error deleting option");
        }
    };

    useEffect(() => {
        getQuesData(); // Fetch question data when component is mounted
    }, []);

    return (
        <div className="ml-64 mt-16 flex flex-col items-center w-full">
            <div className="mb-4">
                <button 
                    className="w-32 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                    onClick={() => setAddForm(!addForm)}
                >
                    Add Question
                </button>
            </div>

            <div className="w-full flex justify-center">
                {addForm && <AddQuesForm/>}
            </div>

            <div className="w-full flex flex-wrap justify-center gap-6 p-4">
                {!addForm && questions.map((question) => (
                    <div 
                        key={question.questionId} 
                        className="w-full md:w-1/2 lg:w-1/3 p-4 border rounded-lg shadow-lg bg-white"
                    >
                        {/* Question Title and Category */}
                        <h3 className="font-bold text-lg mb-2">{question.question}</h3>
                        <p className="text-sm text-gray-500 mb-4">Category: {question.category}</p>

                        {/* Options */}
                        <div className="space-y-3">
                            {question.options.map((option) => (
                                <div key={option.optionId} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <input 
                                            type="radio" 
                                            id={option.optionId} 
                                            name={`question-${question.questionId}`} 
                                            checked={option.correct} 
                                            readOnly 
                                        />
                                        <label 
                                            htmlFor={option.optionId} 
                                            className={option.correct ? "font-bold text-green-500" : ""}
                                        >
                                            {option.optionText}
                                        </label>
                                    </div>
                                    {/* Delete Option Button */}
                                    <button 
                                        onClick={() => deleteOption(option.optionId)} 
                                        className="p-2 rounded-full hover:bg-gray-100"
                                    >
                                        <svg 
                                            xmlns="http://www.w3.org/2000/svg" 
                                            viewBox="0 0 448 512" 
                                            className="h-6 w-6 text-red-500"
                                        >
                                            <path 
                                                d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Delete Question Button */}
                        <div className="mt-4 flex justify-center">
                            <button 
                                onClick={() => deleteQuestion(question.questionId)} 
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 448 512" 
                                    className="h-6 w-6 text-red-500"
                                >
                                    <path 
                                        d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QuestionManagement;

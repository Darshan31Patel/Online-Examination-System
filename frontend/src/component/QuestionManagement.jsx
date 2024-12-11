import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddQuesForm from './AddQuesForm';
import AddProgQuesForm from './AddProgQuesForm';

function QuestionManagement() {
    const [addMcqQues, setAddMcqQues] = useState(false);
    const [addProgQues,setAddProgQues] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [progQues, setProgQues] = useState([])

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

    const getProgQues = async()=>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/admin/progQues/allQues", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setProgQues(response.data)
            // console.log(response.data); 
                       
        } catch (error) {
            console.log("Error fetching questions");
        }
    }

    useEffect(() => {
        getQuesData(); 
        getProgQues();
    }, []);

    return (
        <div className="ml-64 mt-16 flex flex-col items-center w-full">
            <div className="mb-4 flex gap-4">
            <button
                className="w-32 p-3 bg-blue-600 text-white rounded-md"
                onClick={() => {
                    setAddMcqQues(!addMcqQues);
                    if (addProgQues) setAddProgQues(false); 
                }}
            >
                Add MCQ
            </button>
            <button
                className="w-48 p-3 bg-blue-600 text-white rounded-md"
                onClick={() => {
                    setAddProgQues(!addProgQues);
                    if (addMcqQues) setAddMcqQues(false);
                }}
            >
                Add Programming Question
            </button>
        </div>

        <div className="w-full flex justify-center">
            {addMcqQues && <AddQuesForm />}
            {addProgQues && <AddProgQuesForm />}
        </div>


        <div className="w-full flex flex-wrap justify-center gap-4 p-2">
        <div className="w-full mb-4">
            <h1 className="text-xl font-bold">Multiple Choice Question:</h1>
        </div>

            {!addMcqQues && !addProgQues && questions.map((question) => (
                <div 
                    key={question.questionId} 
                    className="w-full md:w-1/2 lg:w-1/3 p-3 border rounded-md shadow-sm bg-white"
                >
                    {/* Question Title and Category */}
                    <h3 className="font-bold text-sm mb-2">{question.question}</h3>
                    <p className="text-xs text-gray-500 mb-3">Category: {question.category}</p>

                    {/* Options */}
                    <div className="space-y-2">
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
                                        className={option.correct ? "font-bold text-green-500 text-xs" : "text-xs"}
                                    >
                                        {option.optionText}
                                    </label>
                                </div>
                                {/* Delete Option Button */}
                                <button 
                                    onClick={() => deleteOption(option.optionId)} 
                                    className="p-1 rounded-full hover:bg-gray-100"
                                >
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        viewBox="0 0 448 512" 
                                        className="h-5 w-5 text-red-500"
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
                    <div className="mt-3 flex justify-center">
                        <button 
                            onClick={() => deleteQuestion(question.questionId)} 
                            className="p-1 rounded-full hover:bg-gray-100"
                        >
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 448 512" 
                                className="h-5 w-5 text-red-500"
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


            <div className="w-full flex flex-wrap justify-center gap-6 p-4">
            <div className="w-full mb-4">
                <h1 className="text-xl font-bold">Programming Question:</h1>
            </div>
            {!addMcqQues && !addProgQues && progQues.map((ques) => (
                <div 
                    key={ques.quesId} 
                    className="w-full md:w-1/2 lg:w-1/3 p-4 border border-gray-300 rounded-lg shadow-lg bg-gray-50"
                >
                    <h3 className="font-bold text-base text-gray-800 mb-3">{ques.question}</h3>
                    <p className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Difficulty:</span> {ques.difficulty}
                    </p>
                    <p className="text-sm text-gray-800 mb-1 font-semibold">Answer:</p>
                    <p className="text-sm text-gray-700">{ques.answer}</p>
                </div>
            ))}

            </div>
        </div>
    );
}

export default QuestionManagement;

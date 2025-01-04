import axios from 'axios';
import React, { useState } from 'react'

function AddQuesForm() {
  const [question,setQuestion] = useState("");
  const [category, setCategory] = useState("");
  const [difficulty,setDifficulty] = useState("")
  const [options, setOptions] = useState([{text:"", isCorrect:false}])

  const handleOptionChange = (index,field,value) =>{
    const updatedOptions = [...options];
    updatedOptions[index][field] = field === "isCorrect" ? value === "true": value;
    setOptions(updatedOptions);
  }
  const handleAddOption = () => {
    setOptions([...options, {text: "", isCorrect:false}]);
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      if(!token){
        console.log("token missing");
        return;
      }

      // Add question
      const questionData = {question:question,category:category,difficulty:difficulty}
      // console.log(questionData);
      
      const response = await axios.post("http://localhost:8080/admin/mcqQues/add",
        questionData,{
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const questionId = response.data.questionId
      if(!questionId){
        console.log("Question not stored")
      }
      for(const option of options){
        const optionData = {optionText:option.text, isCorrect:option.isCorrect, question_id: questionId};
        await axios.post(
           `http://localhost:8080/admin/mcqOption/add/${questionId}`,
           optionData,
           {
            headers: {
              Authorization: `Bearer ${token}`,
            },
           }
        )
        // console.log(response)
      }
      
      setQuestion("");
      setCategory("");
      setDifficulty("")
      setOptions([{ text: "", isCorrect: false }]);
      alert("Question added successfully")

    } catch (error) {
      console.log("Error Occured")
    }

  }

  return (
    <div className='flex justify-center items-center  bg-gray-100'>
      <div className='w-full max-w-md p-6 bg-white shadow-md rounded-lg'>
        <h1 className='text-2xl text-center mb-6 font-bold'>Add Question</h1>

        <form onSubmit={handleSubmit} className='space-y-4'>
        {/* question input */}
          <input type="text" 
          placeholder='Enter Question' 
          value={question} onChange={(e) => setQuestion(e.target.value)} 
          className='w-full p-2 border border-gray-300 rounded' />

          {/* select category */}
          <select value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select Category</option>
            <option value="LOGICAL">Logical</option>
            <option value="TECHNICAL">Technical</option>
            <option value="PROGRAMMING">Programming</option>
          </select>

          {/* select difficulty */}
          <select value={difficulty} 
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded">
            <option value="">Select Difficulty</option>
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
          
          {/* option */}
          <div>
            <h2 className='text-lg font-bold mb-2'>Options</h2>
            {options.map((option,index) => (
              <div key={index} className='flex items-center space-x-4 mb-2'>
                <input type='text'
                  placeholder='Option Text'
                  value={option.text}
                  onChange={(e)=> handleOptionChange(index, "text", e.target.value)}
                  className='w-full p-2 border border-gray-300 rounded'
                />
                <select value={option.isCorrect? "true" : "false"}
                onChange={(e)=> handleOptionChange(index, "isCorrect", e.target.value)}
                className='p-2 border border-gray-300 rounded'
                >
                  <option value={"false"}>Incorrect</option>
                  <option value={"true"}>Correct</option>
                </select>
              </div>
            ))}
            <button
            type='button'
            onClick={handleAddOption}
            className='mt-2 bg-blue-500 text-white px-4 py-2 rounded'>
              Add Another Option
            </button>
          </div>
          <button type='submit'
          className='w-full bg-blue-500 text-white p-2 rounded'>Submit</button>
        </form>
      </div>      
    </div>
  )
}

export default AddQuesForm

import React, { useState } from 'react'
import AddQuesForm from './AddQuesForm';

function QuestionManagement() {
    const [addForm, setAddForm] = useState(false);

    const addQues =()=>{
        setAddForm(!addForm)
    }

  return (
    <div className="ml-64 mt-16 flex flex-col items-center w-full">
      <div className='mb-4'>
            <button className="w-32 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={addQues}>
            Add Question
            </button>
        </div>
        <div className='w-full flex justify-center'>
            {addForm && <AddQuesForm/>}
        </div>
    </div>
  )
}

export default QuestionManagement

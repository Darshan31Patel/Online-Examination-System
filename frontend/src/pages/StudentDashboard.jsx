import React, { useState } from 'react'
import StudentSidebar from '../component/StudentSidebar'
import StudentExam from '../component/StudentExam'
import StudentExamResult from '../component/StudentExamResult'

function StudentDashboard() {
    const [selectedOption, setSelectedOption] = useState("")

    const handleSidebarClick = (Option)=>{
        setSelectedOption(Option)
    }
  return (
    <div className='flex'>
        <StudentSidebar onClick={handleSidebarClick}/>

        {selectedOption==="exam" && <StudentExam/>}
        {selectedOption==="result" && <StudentExamResult/>}
    </div>
  )
}

export default StudentDashboard

import React, { useState } from 'react'
import StudentSidebar from '../component/StudentSidebar'
import StudentExam from '../component/StudentExam'

function StudentDashboard() {
    const [selectedOption, setSelectedOption] = useState("")

    const handleSidebarClick = (Option)=>{
        setSelectedOption(Option)
    }
  return (
    <div className='flex'>
        <StudentSidebar onClick={handleSidebarClick}/>

        {selectedOption==="exam" && <StudentExam/>}
    </div>
  )
}

export default StudentDashboard

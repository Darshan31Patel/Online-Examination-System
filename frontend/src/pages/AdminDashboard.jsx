import React, { useState } from 'react'
import AdminSidebar from '../component/AdminSidebar'
import QuestionManagement from '../component/QuestionManagement';
import ExamManagement from '../component/ExamManagement';
import StudentManagement from '../component/StudentManagement';

function AdminDashboard() {
    const [selectedOption, setSelectedOption] = useState("");

    
    const handleSidebarClick = (option) => {
        setSelectedOption(option);
      };

  return (
    <div className='flex'>
      <AdminSidebar onClick={handleSidebarClick}/>
      
      {selectedOption==="student" && 
      <StudentManagement/>
      }

      {selectedOption==="question" && 
      <QuestionManagement/>}

      {selectedOption==="exam" && 
      <ExamManagement/>}

    </div>
  )
}

export default AdminDashboard

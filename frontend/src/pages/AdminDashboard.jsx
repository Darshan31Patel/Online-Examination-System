import React, { useState } from 'react'
import AdminSidebar from '../component/AdminSidebar'
import StudentManagement from '../component/StudentManagement';
import QuestionManagement from '../component/QuestionManagement';

function AdminDashboard() {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSidebarClick = (option) => {
        setSelectedOption(option);
      };

  return (
    <div className='flex'>
      <AdminSidebar onClick={handleSidebarClick}/>
      
      {selectedOption==="student" && 
      <StudentManagement/>}

      {selectedOption==="question" && 
      <QuestionManagement/>}

    </div>
  )
}

export default AdminDashboard

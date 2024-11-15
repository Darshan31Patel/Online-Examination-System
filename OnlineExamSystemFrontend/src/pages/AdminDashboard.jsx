import React, { useState } from 'react'
import AdminSidebar from '../component/AdminSidebar'
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
      <StudentManagement/>}

    </div>
  )
}

export default AdminDashboard

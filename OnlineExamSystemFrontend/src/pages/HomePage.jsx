import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();
    const navigateAdminLogin = ()=>{
        navigate('/admin/login');
    }
    const navigateStudentLogin =()=>{
        navigate('/student/login')
    }
  return (
    <div className="flex justify-center items-center h-screen overflow-hidden">
      <div className="text-center mx-2">
        <img src="/admin.png" alt="Admin" className="w-64 h-64" onClick={navigateAdminLogin} />
        {/* <p>Admin Login</p> */}
      </div>
      <div className="text-center mx-2">
        <img src="/user.png" alt="Student" className="w-56 h-56" onClick={navigateStudentLogin} />
        <p className='text-2xl font-bold'>Student Login</p>
      </div>
    </div>
  );
}

export default HomePage;

import React from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentSidebar() {

  const navigate = useNavigate();

  const handleOnClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        const response = await axios.post(
          "http://localhost:8080/admin/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        // console.log(response.data);
        
        localStorage.removeItem("token");
      } 
      
    } catch (error) {
      console.error("Logout failed:"); 
    }finally{
      navigate("/")
    }
  };

  return (
    <div className="fixed top-16 left-0 h-screen w-64 bg-blue-800 text-white p-4 overflow-y-auto" >
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => navigate("/student/exam")}>
        <h3 className="text-lg font-bold">Exam</h3>
      </div>
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => navigate("/student/result")}>
        <h3 className="text-lg font-bold">Result</h3>
      </div>
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => navigate("/student/password")}>
        <h3 className="text-lg font-bold">Change Password</h3>
      </div>
      <div>
        <button
          onClick={handleOnClick}
          className="w-full text-left px-4 py-2 mt-2  hover:bg-blue-600 rounded text-white font-bold focus:outline-none"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default StudentSidebar

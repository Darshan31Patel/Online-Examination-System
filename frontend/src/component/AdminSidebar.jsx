import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

function AdminSidebar({ onClick }) {
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
        console.log(response.data);
        
        localStorage.removeItem("token");
        navigate("/");
      } 
    } catch (error) {
      console.error("Logout failed:"); 
    }
  };

  return (
    <div className="fixed top-16 left-0 h-screen w-64 bg-blue-800 text-white p-4 overflow-y-auto">
      <div
        className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded"
        onClick={() => onClick("student")}>
        <h3 className="text-lg font-bold">Student Profile Management</h3>
      </div>
      <div
        className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded"
        onClick={() => onClick("question")}
      >
        <h3 className="text-lg font-bold">Question Management</h3>
      </div>
      <div
        className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded"
        onClick={() => onClick("exam")}
      >
        <h3 className="text-lg font-bold">Exam Management</h3>
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
  );
}

export default AdminSidebar;

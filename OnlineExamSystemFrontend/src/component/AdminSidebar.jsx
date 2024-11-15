import React from "react";

function AdminSidebar({onClick}) {
    
  return (
    <div className="fixed top-16 left-0 h-screen w-64 bg-blue-800 text-white p-4 overflow-y-auto" >
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => onClick("student")}>
        <h3 className="text-lg font-bold">Student Profile Management</h3>
      </div>
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => onClick("question")}>
        <h3 className="text-lg font-bold">Question Management</h3>
      </div>
      <div className="hover:bg-blue-600 cursor-pointer px-4 py-2 rounded" onClick={() => onClick("exam")}>
        <h3 className="text-lg font-bold">Exam Management</h3>
      </div>
    </div>
  );
}

export default AdminSidebar;

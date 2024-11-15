import React, { useState } from 'react';
import axios from 'axios';

function StudentDetailsContainer({ student, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [rollNo, setRollNo] = useState(student.rollNo);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:8080/admin/updateStudent/${student.studentId}`,
        {
          name,
          email,
          rollNo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data);
      setIsEditing(false);
      onUpdate({ ...student, name, email, rollNo })
    } catch (error) {
      console.error('Error updating student information:', error);
      alert('Failed to update student information');
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(student.name);
    setEmail(student.email);
    setRollNo(student.rollNo);
  };

  const handleDeleteClick = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this student?');
    if (confirmation) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(
          `http://localhost:8080/admin/deleteStudent/${student.studentId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
        alert(response.data); 
        onDelete(student.studentId)
      } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student');
      }
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white border border-gray-200">
      <div className="space-y-4">
        {isEditing ? (
          <div>
            <div className="space-y-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Name"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Email"
              />
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Roll No"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSaveClick}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="space-y-2">
              <p><strong>Name:</strong> {student.name}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Roll No:</strong> {student.rollNo}</p>
            </div>
            <div className="flex space-x-4 text-gray-500">
              {/* Edit icon button */}
              <button
                onClick={handleEditClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="h-6 w-6 text-blue-500"
                >
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
              </button>

              {/* Delete icon button */}
              <button
                onClick={handleDeleteClick}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6 w-6 text-red-500"
                >
                  <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDetailsContainer;

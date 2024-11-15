import axios from 'axios';
import React, { useState } from 'react'

function AddStudentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");

  const addStudent = async (e)=>{
    e.preventDefault();
    const data = {name:name, email:email, rollNo:rollNo, password:password }
    console.log(data)
    try {
        const token = localStorage.getItem("token");
        console.log(token);        
        const response = await axios.post("http://localhost:8080/admin/addStudent",data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        alert(response.data)
        // console.log(response)
        console.log("Student Added successfully");
        setName("");
        setEmail("");
        setRollNo("");
        setPassword("");

        
    } catch (error) {
        console.log("Error occured in adding student details")
    }
  }

  return (
    <div>
      <div className="flex justify-center items-center  bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl text-center mb-6">Student Registration</h1>
        <form onSubmit={addStudent} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="email"
            placeholder="Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="text"
            placeholder="Roll No"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Register
          </button>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddStudentForm

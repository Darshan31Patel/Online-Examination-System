import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminSignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignupSubmit = async(e)=>{
        e.preventDefault();
        const data = {
            name: name,
            email: email,
            password: password
        }
        // console.log(data);
        

        try {
            const response = await axios.post("http://localhost:8080/admin/signup",data)
            if(response.status === 200){
                console.log("Admin created successfully");
                navigate("/admin/login");
            }
        } catch (error) {
            console.log("Error occured in creating admin");
            
        }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-4xl text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSignupSubmit} className="space-y-4">
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
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
            Sign Up
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">
          Already have an account?{' '}
          <a href="/login" className="underline text-black">
            Login Now
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminSignUp

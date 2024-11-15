import axios from 'axios';
import React, { useState } from 'react'

function StudentLoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLoginSubmit = async (e) => {
      e.preventDefault();
      // console.log(email + " " + password)
      const data = {email: email, password: password};
      console.log(data);
      
      try{
          const response = await axios.post('http://localhost:8080/student/login', data);
          console.log("data send");
        //   console.log(response);
          
          if(response.status === 200){
            localStorage.setItem('token', response.data.token);
            console.log("token stored")
          }
      }catch(error){
          console.log("Error occured in login");
      }
  
    };
  
    return (
      <div className="h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-4xl text-center mb-6">Login</h1>
  
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
  
            <div>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
  
            <div>
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default StudentLoginPage

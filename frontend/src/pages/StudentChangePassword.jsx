import React, { useState } from 'react'
import StudentSidebar from '../component/StudentSidebar'
import axios from 'axios'

function StudentChangePassword() {
    const [oldPassword,setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    const handleSubmit = async(e)=>{
        e.preventDefault()
        // console.log(newPassword + "  " + oldPassword);
        const data = {
          newPassword,
          oldPassword
        }
        const token = localStorage.getItem('token')
        
        try {
          const response = await axios.post("http://localhost:8080/student/changePassword",data,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          alert(response.data)
        } catch (error) {
          console.log("error in changing password");
        }
        
        setNewPassword("")
        setOldPassword("")
    }
  return (
    <div className='flex'>
      <StudentSidebar/>
      <div className='ml-64 mt-16 flex flex-col items-center w-full'>
        <div className='w-full max-w-md p-6 bg-white shadow-md rounded-lg'>
            <h1 className='text-2xl text-center mb-6 font-bold'>Change Password</h1>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <input type="password" 
                        placeholder='Enter Old Password' 
                        value={oldPassword} 
                        className='w-full p-2 border border-gray-300 rounded' 
                        onChange={(e)=>setOldPassword(e.target.value)}/>
                <input type="password" 
                    placeholder='Enter New Password' 
                    value={newPassword} 
                    className='w-full p-2 border border-gray-300 rounded' 
                    onChange={(e)=>setNewPassword(e.target.value)}/>
                <button type='submit' className='w-full bg-blue-500 text-white p-2 rounded'>
                Submit</button>
            </form>
        </div>
      </div>
    </div>
  )
}

export default StudentChangePassword

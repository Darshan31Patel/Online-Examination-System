import React, { useEffect, useState } from 'react'
import AddStudentForm from './AddStudentForm'
import StudentDetailsContainer from './StudentDetailsContainer';
import axios from 'axios';

function StudentManagement() {

    const [addForm, setAddForm] = useState(false);
    const [students, setStudents] = useState([]);


    const addStudent =()=>{
        setAddForm(!addForm);
    }
    // const student = {
    //     name: "darshan",
    //     email: "email",
    //     rollNo: "21dffv"
    // }

    const getData = async () =>{
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get("http://localhost:8080/admin/getAllStudent",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setStudents(response.data)
            console.log(response);            
        } catch (error) {
            console.log("Error fetching data");
            
        }
    }

    const handleUpdateStudent = (updatedStudent) => {
        setStudents(prevStudents =>
            prevStudents.map(student =>
                student.studentId === updatedStudent.studentId
                    ? { ...student, ...updatedStudent }
                    : student
            )
        );
    };

    const handleDeleteStudent = (studentId) => {
        setStudents((prevStudents) => prevStudents.filter((student) => student.studentId !== studentId));
      };

    useEffect(()=>{
        getData();
    },[])

  return (
    <div className="ml-64 mt-16 flex flex-col items-center w-full">
        <div className='mb-4'>
            <button className="w-32 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700" onClick={addStudent}>
            Add Student
            </button>
        </div>
        <div className='w-full flex justify-center'>
        {addForm && <AddStudentForm/>}
        </div>
        <div className='w-full flex flex-wrap justify-center gap-4 p-4'>
            {!addForm && 
            students.map((student)=>(<StudentDetailsContainer key={student.studentId} student={student} onUpdate={handleUpdateStudent} onDelete={handleDeleteStudent} />))
            }
        </div>
    </div>
  )
}

export default StudentManagement

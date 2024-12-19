import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminSignUp from './pages/AdminSignUp';
import StudentLoginPage from './pages/StudentLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ExamPage from './pages/ExamPage';
import ResultPageAdmin from './pages/ResultPageAdmin';
import EditExamAdmin from './pages/EditExamAdmin';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='admin/login' element={<AdminLoginPage />} />
        <Route path='admin/signup' element={<AdminSignUp/>}/>
        <Route path='student/login' element={<StudentLoginPage />} />
        <Route path='admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='student/dashboard' element={<StudentDashboard/>}/>
        <Route path='student/exam/:id' element={<ExamPage/>}/>
        <Route path='examResult/:id' element={<ResultPageAdmin/>}/>
        <Route path='editExam/:id' element={<EditExamAdmin/>}/>
      </Route>
    </Routes>
  );
}

export default App;

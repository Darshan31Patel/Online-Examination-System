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
import StudentManagement from './pages/StudentManagementPAge';
import QuestionManagement from './pages/QuestionManagementPage';
import ExamManagement from './pages/ExamManagementPage';
import StudentExam from './pages/StudentExamPage';
import StudentExamResult from './pages/StudentExamResultPage';
import StudentChangePassword from './pages/StudentChangePassword';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path='admin/login' element={<AdminLoginPage />} />
        <Route path='admin/signup' element={<AdminSignUp/>}/>
        <Route path='student/login' element={<StudentLoginPage />} />
        <Route path='admin/dashboard' element={<AdminDashboard/>}/>
        <Route path='admin/studentManagement' element={<StudentManagement/>}/>
        <Route path='admin/questionManagement' element={<QuestionManagement/>}/>
        <Route path='admin/examManagement' element={<ExamManagement/>}/>
        <Route path='student/dashboard' element={<StudentDashboard/>}/>
        <Route path='student/exam' element={<StudentExam/>}/>
        <Route path='student/result' element={<StudentExamResult/>}/>
        <Route path='student/exam/:id' element={<ExamPage/>}/>
        <Route path='examResult/:id' element={<ResultPageAdmin/>}/>
        <Route path='editExam/:id' element={<EditExamAdmin/>}/>
        <Route path='student/password' element={<StudentChangePassword/>}/>
      </Route>
    </Routes>
  );
}

export default App;

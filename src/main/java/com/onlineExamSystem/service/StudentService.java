package com.onlineExamSystem.service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.repository.AdminRepository;
import com.onlineExamSystem.repository.StudentRepository;

@Service
public class StudentService implements UserDetailsService{

	@Autowired
	public StudentRepository studentRepository;
	@Autowired
	public AdminService adminService;
	@Autowired
	public AdminRepository adminRepository;
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
	
	
	public String addStudent(Student student, long adminId) {
		Admin admin = adminRepository.findById(adminId).orElseThrow(()-> new RuntimeException("Admin not found"));
		student.setAdminName(admin);
		student.setPassword(encoder.encode(student.getPassword()));
		studentRepository.save(student);
		
		return "Student added successfully";
		
	}
	
	
	public List<Student> getAllStudents(Long adminId){
		return studentRepository.findByAdminNameAdminId(adminId);
	}
	
	
	public String updateStudent(Long StudentId, Student student, Long adminId) {
		Optional<Student> existingStudent = studentRepository.findById(StudentId);
		Optional<Admin> admin = adminRepository.findById(adminId);
		if(existingStudent.isPresent() && existingStudent.get().getAdminName().getAdminId().equals(adminId)) {
			student.setStudentId(StudentId);
			student.setAdminName(admin.get());
			studentRepository.save(student);
			return "Student Details Updated Successfully";
		}
		return "Student not found";
	}
	
	
	public String deleteStudent(Long studentId, Long adminId) {
		Optional<Student> student = studentRepository.findById(studentId);
		if(student.isPresent() && student.get().getAdminName().getAdminId().equals(adminId)) {
			studentRepository.delete(student.get());
			return "Student Details Deleted Successfully";
		}
		return "Student Details not found";
	}
	
	
// code for authorization
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException{
		Student student = studentRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Student not found with email: " + email));
		
		return new User(student.getEmail(),
                student.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority("ROLE_STUDENT")));
	}
}

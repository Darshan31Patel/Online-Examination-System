package com.onlineExamSystem.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.repository.StudentRepository;
import com.onlineExamSystem.service.ExamService;
import com.onlineExamSystem.service.LoginRequest;
import com.onlineExamSystem.service.StudentService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class StudentController {
	
	@Autowired
	StudentService studentService;
	@Autowired
	JwtUtil jwtUtil;
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	ExamService examService;
	
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
	
	private Logger logger = LoggerFactory.getLogger(StudentController.class);
	
	private String getTokenFromRequest(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token is missing");
        }
        return token.startsWith("Bearer ") ? token.substring(7) : token;
    }

	@PostMapping("/student/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
		String token = studentService.login(loginRequest.getEmail(),loginRequest.getPassword());
//		System.out.println("token in student login : " + token);
		if (token!=null) {
			Map<String, String> response = new HashMap<String, String>();
			response.put("token", token);
			logger.info("Student Login Successfull... emailID:{}",loginRequest.getEmail());
			return ResponseEntity.ok(response);
		}else {
			logger.error("Student Login failed");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","login failed"));
		}
	}
	
	@GetMapping("/student/exam/getAllExamDetails")
	public List<Exam> getAllExam(HttpServletRequest request) {
		String token = getTokenFromRequest(request);
		Long studentId = jwtUtil.extractStudentId(token);
		Student student = studentRepository.findByStudentId(studentId);
//		System.out.println(student);
		Admin admin = student.getAdminName();
//		System.out.println(admin);
		List<Exam> examDetaiList = examService.getExamsDetails(admin);
		return examDetaiList;
		
	} 
	
	@PostMapping("/student/changePassword")
	public String changePassword(@RequestBody Map<String, String> data,HttpServletRequest request) {
//		System.out.println(data);
		String token = getTokenFromRequest(request);
		Long studentId = jwtUtil.extractStudentId(token);
		Student student = studentRepository.findByStudentId(studentId);
		if(encoder.matches(data.get("oldPassword"), student.getPassword())) {
			student.setPassword(encoder.encode(data.get("newPassword")));
//			System.out.println(student);
			studentRepository.save(student);
			return "password change successfully";

		}else {
			return "Incorrect Old password";
		}
	}
	

	
}

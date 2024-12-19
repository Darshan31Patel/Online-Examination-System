package com.onlineExamSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.ExamSubmission;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.repository.ExamRepository;
import com.onlineExamSystem.repository.StudentRepository;
import com.onlineExamSystem.service.AdminService;
import com.onlineExamSystem.service.ExamService;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class ExamController {

	@Autowired
	ExamService examService;
	@Autowired
	JwtUtil jwtUtil;
	@Autowired
	AdminService adminService;
	@Autowired
	StudentRepository studentRepository;
	@Autowired
	ExamRepository examRepository;
	
	
	private Admin verifyAdmin(String token) {
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token is missing");
        }
        if (token.startsWith("Bearer ")) {
            token = token.substring(7);
        }
        Long adminId = jwtUtil.extractAdminId(token);
        return adminId != null ? adminService.findAdminById(adminId) : null;
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String token = jwtUtil.getTokenFromRequest(request);
        if (token == null || token.isEmpty()) {
            throw new IllegalArgumentException("Token is missing");
        }
        return token.startsWith("Bearer ") ? token.substring(7) : token;
    }
	
	@PostMapping("/admin/exam/createExam")
	public String createExam(@RequestBody Exam exam, HttpServletRequest request) {
		String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        exam.setAdmin(admin);
		examService.createExam(exam);
		System.out.println("Exam created successfully");
		return "Exam created successfully";
	}
	
	@GetMapping("/admin/exam/getExamDetails")
	public List<Exam> getExam(HttpServletRequest request) {
		String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        Admin adminDetailAdmin = adminService.findAdminById(admin.getAdminId());
		return examService.getExamsDetails(adminDetailAdmin);
	}
	
	@GetMapping("/admin/exam/getExamById/{examId}")
	public Exam getExamById(@PathVariable("examId") long examId) {
	    return examService.getExamById(examId);
	}
	
	@PostMapping("/exam/saveMarks")
	public ExamSubmission saveMarks(@RequestBody ExamSubmission examSubmission, HttpServletRequest request) {
		String token = getTokenFromRequest(request);
		Long studentId = jwtUtil.extractStudentId(token);
		Student student = studentRepository.findByStudentId(studentId);
		Long examId = examSubmission.getExam().getExamId();
		Exam exam = examRepository.findByExamId(examId);
		examSubmission.setStudent(student);
		examSubmission.setExam(exam);
		return examService.saveMarks(examSubmission);
	}
	
	@GetMapping("/exam/result/{examId}")
	public List<ExamSubmission> getMarksByExam(@PathVariable Long examId) {
		return examService.getMarksByExamId(examId);
	}
	
	@GetMapping("/exam/result/student")
	public List<ExamSubmission> getMarksByStudent(HttpServletRequest request) {
		String token = getTokenFromRequest(request);
		Long studentId = jwtUtil.extractStudentId(token);
		Student student = studentRepository.findByStudentId(studentId);
		return examService.getMarksByStudent(student);
	}
	
}

package com.onlineExamSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.service.AdminService;
import com.onlineExamSystem.service.ExamService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class ExamController {

	@Autowired
	ExamService examService;
	@Autowired
	JwtUtil jwtUtil;
	@Autowired
	AdminService adminService;
	
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
}

package com.onlineExamSystem.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.service.AdminService;
import com.onlineExamSystem.service.LoginRequest;
import com.onlineExamSystem.service.StudentService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class AdminController {

	@Autowired
	AdminService adminService;
	@Autowired
	StudentService studentService;
	@Autowired
	JwtUtil jwtUtil;
	
	private Logger logger = LoggerFactory.getLogger(AdminController.class);
	
	
	@GetMapping("/admin/test")
	public String test() {
		return "hello ";
	}
	
	
	@PostMapping("/admin/signup")
	public ResponseEntity<Map<String, String>> registerAdmin(@RequestBody Admin admin) {
	    try {
	        String responseMessage = adminService.saveDetails(admin);
	        logger.info("Admin created with name:{} email:{}",admin.getName(),admin.getEmail());
	        return ResponseEntity.ok(Map.of("message", responseMessage));
	    } catch (Exception e) {	    
	    	logger.error("Admin Registration failed");
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", "Registration failed"));
	    }
	}

	
	@PostMapping("/admin/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
		String token = adminService.login(loginRequest.getEmail(),loginRequest.getPassword());
//		System.out.println("token in admin login : " + token);
		if (token!=null) {
			Map<String, String> response = new HashMap<String, String>();
			response.put("token", token);
			logger.info("Admin Login successfull... emailId:{}",loginRequest.getEmail());
			return ResponseEntity.ok(response);
		}else {
			logger.error("Admin Login failed");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","login failed"));
		}
	}
	
	@PostMapping("/admin/logout")
	public ResponseEntity<Map<String, String>> logout(HttpServletRequest request){
		String token = jwtUtil.getTokenFromRequest(request);
		if(token!=null) {
			Map<String, String> response = new HashMap<String, String>();
			response.put("token", null);
			logger.info("Logout Successfull");
			return ResponseEntity.ok(response);
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","logout failed"));
		}
	}

	
	@PostMapping("/admin/addStudent")
	public String addStudent(@RequestBody Student student, HttpServletRequest request) {
//		System.out.println(request);
		String token = jwtUtil.getTokenFromRequest(request);
//		System.out.println(token);
		if(token==null || token.isEmpty()) {
			return "Token is missing";
		}
		
		try {
			Long adminId = jwtUtil.extractAdminId(token);
			Admin admin = adminService.findAdminById(adminId);
//			System.out.println("AdminId "+adminId + "  token  " +  adminService.getTokenAdmin(adminId));
			if(token.equals(adminService.getTokenAdmin(adminId))) {
				student.setAdminName(admin);
//				System.out.println(student.toString());
				studentService.addStudent(student, adminId);
//				logger.info("Student added by admin successfully");
				return "Student added successfully";
			}else {
//				logger.error("Error in adding student");
				return "Unauthorized or invalid token";
			}
		} catch (Exception e) {
			return "Invalid token";
		}
	}
	
	
	@GetMapping("/admin/getAllStudent")
	public List<Student> getAllStudent(@RequestHeader("Authorization") String token){
		System.out.println("All student token : " + token);

	    if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		return studentService.getAllStudents(adminId);
	}
	
	
	@PutMapping("/admin/updateStudent/{id}")
	public String updateStudent(@PathVariable Long id, @RequestBody Student student, @RequestHeader("Authorization") String token) {
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		
		return studentService.updateStudent(id, student, adminId);
	}
	
	
	@DeleteMapping("/admin/deleteStudent/{studentId}")
	public String deleteStudent(@PathVariable Long studentId, @RequestHeader("Authorization") String token) {
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		return studentService.deleteStudent(studentId, adminId);
	}
	
	@PostMapping("/admin/studentExcelData")
    public List<Student> saveExcelStudentData(@RequestParam("file") MultipartFile file, @RequestHeader("Authorization") String token) throws IOException{
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		Admin admin = adminService.findAdminById(adminId);
//		System.out.println(admin);
		List<Student> students = studentService.saveStudentExcelData(file, admin);
//		System.out.println(students);
    	return students;
    }
}

//@PostMapping("/admin/login")
//public String login(@RequestBody LoginRequest loginRequest) {
////	System.out.println(loginRequest.getEmail() + " " + loginRequest.getPassword());
//	boolean isAuthenticated = adminService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
//	if(isAuthenticated) {
//		return "Login Successful";
//	}
//	else {
//		return "Login failed";
//	}

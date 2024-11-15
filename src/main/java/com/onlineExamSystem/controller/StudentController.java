package com.onlineExamSystem.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.service.LoginRequest;
import com.onlineExamSystem.service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000",allowCredentials = "true")
public class StudentController {
	
	@Autowired
	StudentService studentService;

	@PostMapping("/student/login")
	public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
		String token = studentService.login(loginRequest.getEmail(),loginRequest.getPassword());
//		System.out.println("token in student login : " + token);
		if (token!=null) {
			Map<String, String> response = new HashMap<String, String>();
			response.put("token", token);
			return ResponseEntity.ok(response);
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error","login failed"));
		}
	}
	
}

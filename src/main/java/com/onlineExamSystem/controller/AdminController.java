package com.onlineExamSystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.service.AdminService;
import com.onlineExamSystem.service.LoginRequest;

@RestController
public class AdminController {

	@Autowired
	AdminService adminService;
	
	@PostMapping("/admin/signup")
    public String registerAdmin(@RequestBody Admin admin) {
        return adminService.saveDetails(admin);
    }
	
	@PostMapping("/admin/login")
	public String login(@RequestBody LoginRequest loginRequest) {
		System.out.println(loginRequest.getEmail() + " " + loginRequest.getPassword());
		boolean isAuthenticated = adminService.authenticate(loginRequest.getEmail(), loginRequest.getPassword());
		if(isAuthenticated) {
			return "Login Successful";
		}
		else {
			return "Login failed";
		}
	}
	
}

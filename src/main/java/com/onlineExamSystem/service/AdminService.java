package com.onlineExamSystem.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.repository.AdminRepository;

@Service
public class AdminService {

	@Autowired
	AdminRepository adminRepository;
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
	
	public String saveDetails(Admin admin) {
		admin.setPassword(encoder.encode(admin.getPassword()));	
		adminRepository.save(admin);
		return "Admin Registered Successfully";
	}
	
	public boolean authenticate(String email, String password) {
		return adminRepository.findByEmail(email)
				.map(admin -> encoder.matches(password, admin.getPassword()))
				.orElse(false);
		
	}
}

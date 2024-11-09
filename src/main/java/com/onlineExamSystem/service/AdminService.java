package com.onlineExamSystem.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.repository.AdminRepository;

@Service
public class AdminService implements UserDetailsService{

	@Autowired
	AdminRepository adminRepository;
	@Autowired
	private JwtUtil jwtUtil;
	
	private Map<Long, String> adminTokens = new HashMap<Long, String>();
	BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(16);
	
	public String login(String email, String password) {
		Admin admin = adminRepository.findByEmail(email).orElse(null);
		if(admin!=null && encoder.matches(password, admin.getPassword()) ) {
			String token = jwtUtil.generateToken(email, admin.getAdminId());
			adminTokens.put(admin.getAdminId(), token);
			return token;
			
		}
		
		return null;
	}
	
	public String getTokenAdmin(Long adminId) {
		return adminTokens.get(adminId);
	}
	
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

	public Admin findAdminById(Long adminId) {
	    return adminRepository.findById(adminId).orElse(null);
	}
	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
      Admin admin = adminRepository.findByEmail(email)
              .orElseThrow(() -> new UsernameNotFoundException("Admin not found with email: " + email));
      return new User(admin.getEmail(), admin.getPassword(), 
              Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")));
  }

	

}

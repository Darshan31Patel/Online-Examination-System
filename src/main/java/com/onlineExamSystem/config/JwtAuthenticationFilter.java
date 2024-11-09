package com.onlineExamSystem.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.service.AdminService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	@Autowired
	private JwtUtil jwtUtil;
	@Autowired
	private AdminService adminService;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
//		String token = jwtUtil.getTokenFromRequest(request);
		System.out.println("JWT authentication filter....");
		String token = request.getHeader("Authorization");
		
		System.out.println("token in jwtAuth : " + token);
		
		if(token!=null && token.startsWith("Bearer ")) {
			token = token.substring(7);
			Long adminId = jwtUtil.extractAdminId(token);
			if (adminId != null && token.equals(adminService.getTokenAdmin(adminId))) {
                // Set up authentication if needed
                WebAuthenticationDetailsSource authenticationDetailsSource = new WebAuthenticationDetailsSource();
                authenticationDetailsSource.buildDetails(request);
                SecurityContextHolder.getContext().setAuthentication(null); // Set an authentication object if required
            }
			
			
//			if(adminId!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
//				UserDetails admin = adminService.loadUserByUsername(adminId.toString());
//				UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(admin, null, admin.getAuthorities());
//				
//				authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//				SecurityContextHolder.getContext().setAuthentication(authToken);
//			}
		}
		filterChain.doFilter(request, response);
	}
	
	
}

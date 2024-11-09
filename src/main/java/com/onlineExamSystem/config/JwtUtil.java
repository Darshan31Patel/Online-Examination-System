package com.onlineExamSystem.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private String secretKey = "onlineExamSystem12345678901234567890"; 
    private long expirationTime = 86400000; // 1 day in milliseconds

    // Generate a JWT token with adminId as a claim
    public String generateToken(String email, Long adminId) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes()); // Convert secret key to Key object
        return Jwts.builder()
                .setSubject(email)
                .claim("adminId", adminId)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expirationTime))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Extract claims from the JWT
    public Claims extractClaims(String token) {
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes()); // Convert secret key to Key object
        return Jwts.parserBuilder()
                .setSigningKey(key)  // Use the Key object for verification
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // Get adminId from JWT token
    public Long extractAdminId(String token) {
        return Long.parseLong(extractClaims(token).get("adminId").toString());
    }

    // Extract JWT token from Authorization header
    public String getTokenFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
//        System.out.println("Authorization Header: " + header);
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // Remove "Bearer " prefix
        }
        return null;
    }
}
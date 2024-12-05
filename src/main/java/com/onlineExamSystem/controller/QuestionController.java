package com.onlineExamSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.McqOption;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.service.AdminService;
import com.onlineExamSystem.service.QuestionService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminService adminService;

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

    @PostMapping("/admin/mcqQues/add")
    public ResponseEntity<?> addQues(@RequestBody McqQuestion mcqQuestion, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            mcqQuestion.setAdmin(admin);
            McqQuestion ques = questionService.createQuestion(mcqQuestion);
            return ResponseEntity.ok(ques);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding question");
    }

    @GetMapping("/admin/mcqQues/{quesId}")
    public ResponseEntity<?> getQuestion(@PathVariable Long quesId, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            McqQuestion ques = questionService.getQuestion(quesId);
            return ResponseEntity.ok(ques);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting question");
    }

    @GetMapping("/admin/mcqQues/allQues")
    public ResponseEntity<?> getAllQuestion(HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            List<McqQuestion> ques = questionService.getAllQuestion();
            return ResponseEntity.ok(ques);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting questions");
    }

    @PutMapping("/admin/mcqQues/update/{questionId}")
    public ResponseEntity<?> updateQuestion(@PathVariable Long questionId, @RequestBody McqQuestion updatedQuestion, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            McqQuestion updated = questionService.updateQuestion(questionId, updatedQuestion);
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error updating question");
    }

    @DeleteMapping("/admin/mcqQues/delete/{quesId}")
    public ResponseEntity<?> deleteQues(@PathVariable Long quesId, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            String result = questionService.deleteQuestion(quesId);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting question");
    }

    @PostMapping("/admin/mcqOption/add/{quesId}")
    public ResponseEntity<?> addOption(@PathVariable Long quesId, @RequestBody McqOption mcqOption, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            McqOption addedOption = questionService.addOption(quesId, mcqOption);
            return ResponseEntity.ok(addedOption);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding option");
    }

    @GetMapping("/admin/mcqOption/getOption/{quesId}")
    public ResponseEntity<?> getOption(@PathVariable Long quesId, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            List<McqOption> options = questionService.getOptionsByQuestion(quesId);
            return ResponseEntity.ok(options);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error getting options");
    }

    @DeleteMapping("/admin/mcqOption/deleteOption/{optionId}")
    public ResponseEntity<?> deleteOption(@PathVariable Long optionId, HttpServletRequest request) {
        String token = getTokenFromRequest(request);
        Admin admin = verifyAdmin(token);
        if (admin != null) {
            String result = questionService.deleteOption(optionId);
            return ResponseEntity.ok(result);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error deleting option");
    }
}

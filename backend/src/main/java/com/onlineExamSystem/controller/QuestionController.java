package com.onlineExamSystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import com.onlineExamSystem.config.JwtUtil;
import com.onlineExamSystem.entity.McqOption;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.service.QuestionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
public class QuestionController {

	@Autowired
	private QuestionService questionService;
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/admin/mcqQues/add")
	public String addQues(@RequestBody McqQuestion mcqQuestion, @RequestHeader("Authorization") String token) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			McqQuestion ques = questionService.createQuestion(mcqQuestion);	
			System.out.println("Question added");
			return ques.toString();
		}
		return "Error adding question";
		
	}

	@GetMapping("/admin/mcqQues/{quesId}")
	public String getQuestion(@PathVariable Long quesId, @RequestHeader("Authorization") String token) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			McqQuestion ques = questionService.getQuestion(quesId);	
			System.out.println("Question : " + ques.toString());
			return ques.toString();
		}
		return "Error getting question";
	}
	
	@GetMapping("/admin/mcqQues/allQues")
	public String getAllQuestion(@RequestHeader("Authorization") String token) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			List<McqQuestion> ques = questionService.getAllQuestion();	
			System.out.println("Question : " + ques.toString());
			return ques.toString();
		}
		return "Error getting question";
	}

	
	@PutMapping("/admin/mcqQues/update/{questionId}")
	public String updateQuestion(@PathVariable Long questionId, @RequestBody McqQuestion updatedQuestion, @RequestHeader("Authorization") String token) {
//		System.out.println(updatedQuestion.toString());
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			McqQuestion updated = questionService.updateQuestion(questionId, updatedQuestion);
			System.out.println("Question : " + updated.toString());
			return updated.toString();
		}
		return "Error updating question";
	}
 
	
	@DeleteMapping("/admin/mcqQues/delete/{quesId}")
	public String deleteQues(@PathVariable Long quesId, @RequestHeader("Authorization") String token) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			
			return questionService.deleteQuestion(quesId);
		}
		return "Error deleting question";
	}
	
	
	@PostMapping("/admin/mcqOption/add/{quesId}")
	public String addOption(@PathVariable Long quesId, @RequestBody McqOption mcqOption ,@RequestHeader("Authorization") String token ) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			McqOption addedOption = questionService.addOption(quesId, mcqOption);
			return addedOption.toString();
		}
		return "Error adding option";
	}
	
	
	@GetMapping("/admin/mcqOption/getOption/{quesId}")
	public String getOption(@PathVariable Long quesId,@RequestHeader("Authorization") String token ) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			List<McqOption> option = questionService.getOptionsByQuestion(quesId);
			return option.toString();
		}
		return "Error getting option";
	}
	
	@DeleteMapping("/admin/mcqOption/deleteOption/{optionId}")
	public String deleteOption(@RequestBody Long optionId, @RequestHeader("Authorization") String token ) {
		if (token == null || token.isEmpty()) {
	        return "Token is missing";
	    }
		if (token.startsWith("Bearer ")) {
	        token = token.substring(7);
	    }
		Long adminId = jwtUtil.extractAdminId(token);
		if(adminId!=null) {
			return questionService.deleteOption(optionId);
		}
		return "Error deleting option";
	}
	
}

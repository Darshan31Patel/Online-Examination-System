package com.onlineExamSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProgrammingQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quesId;
	
	private String question;
	private String answer;
	
	private DifficultyLevel difficulty;
	
	public enum DifficultyLevel {
		EASY, MEDIUM, HARD
	}
}

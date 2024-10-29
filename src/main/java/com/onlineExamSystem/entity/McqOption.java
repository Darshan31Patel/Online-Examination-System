package com.onlineExamSystem.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class McqOption {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long optionId;
	
	private String optionText;
	private boolean isCorrect;
	
	@ManyToOne
	@JoinColumn(name="question_id")
	private McqQuestion ques;
}

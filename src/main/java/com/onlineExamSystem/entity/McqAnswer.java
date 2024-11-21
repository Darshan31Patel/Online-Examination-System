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
public class McqAnswer {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ansID;
	
	@ManyToOne
	@JoinColumn(name = "submission_id")
	private ExamSubmission submission;
	
	@ManyToOne
    @JoinColumn(name = "question_id")
	private McqQuestion ques;
	
	@ManyToOne
    @JoinColumn(name = "option_id")
	private McqOption selectedOption;
}

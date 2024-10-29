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
public class ProgrammingAnswer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long ansID;
	private String ansText;
	
	@ManyToOne
	@JoinColumn(name = "submission_id")
	private ExamSubmission submission;
	
	@ManyToOne
	@JoinColumn(name = "ques_id")
	private ProgrammingQuestion ques;
}




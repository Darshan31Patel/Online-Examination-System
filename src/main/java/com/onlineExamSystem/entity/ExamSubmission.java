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
public class ExamSubmission {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long submissionId;
	private int score;
	private boolean isPassed;
	
	@ManyToOne
	@JoinColumn(name = "exam_id")
	private Exam exam;
	
	@ManyToOne
	@JoinColumn(name = "student_id")
	private Student student;
}

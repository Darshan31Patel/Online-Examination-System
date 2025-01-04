package com.onlineExamSystem.entity;

import jakarta.persistence.Column;
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
	@Column(columnDefinition = "TEXT")
	private String ansText;
	
	@ManyToOne
	@JoinColumn(name = "submission_id")
	private ExamSubmission submission;
	
	@ManyToOne
	@JoinColumn(name = "ques_id")
	private ProgrammingQuestion ques;

	public Long getAnsID() {
		return ansID;
	}

	public void setAnsID(Long ansID) {
		this.ansID = ansID;
	}

	public String getAnsText() {
		return ansText;
	}

	public void setAnsText(String ansText) {
		this.ansText = ansText;
	}

	public ExamSubmission getSubmission() {
		return submission;
	}

	public void setSubmission(ExamSubmission submission) {
		this.submission = submission;
	}

	public ProgrammingQuestion getQues() {
		return ques;
	}

	public void setQues(ProgrammingQuestion ques) {
		this.ques = ques;
	}

	public ProgrammingAnswer(Long ansID, String ansText, ExamSubmission submission, ProgrammingQuestion ques) {
		super();
		this.ansID = ansID;
		this.ansText = ansText;
		this.submission = submission;
		this.ques = ques;
	}

	public ProgrammingAnswer() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}




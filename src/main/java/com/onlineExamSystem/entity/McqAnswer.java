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

	public Long getAnsID() {
		return ansID;
	}

	public void setAnsID(Long ansID) {
		this.ansID = ansID;
	}

	public ExamSubmission getSubmission() {
		return submission;
	}

	public void setSubmission(ExamSubmission submission) {
		this.submission = submission;
	}

	public McqQuestion getQues() {
		return ques;
	}

	public void setQues(McqQuestion ques) {
		this.ques = ques;
	}

	public McqOption getSelectedOption() {
		return selectedOption;
	}

	public void setSelectedOption(McqOption selectedOption) {
		this.selectedOption = selectedOption;
	}

	public McqAnswer(Long ansID, ExamSubmission submission, McqQuestion ques, McqOption selectedOption) {
		super();
		this.ansID = ansID;
		this.submission = submission;
		this.ques = ques;
		this.selectedOption = selectedOption;
	}

	public McqAnswer() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

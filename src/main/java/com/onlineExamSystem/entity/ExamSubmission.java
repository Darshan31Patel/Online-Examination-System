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

	public Long getSubmissionId() {
		return submissionId;
	}

	public void setSubmissionId(Long submissionId) {
		this.submissionId = submissionId;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public boolean isPassed() {
		return isPassed;
	}

	public void setPassed(boolean isPassed) {
		this.isPassed = isPassed;
	}

	public Exam getExam() {
		return exam;
	}

	public void setExam(Exam exam) {
		this.exam = exam;
	}

	public Student getStudent() {
		return student;
	}

	public void setStudent(Student student) {
		this.student = student;
	}

	@Override
	public String toString() {
		return "ExamSubmission [submissionId=" + submissionId + ", score=" + score + ", isPassed=" + isPassed
				+ ", exam=" + exam + ", student=" + student + "]";
	}

	public ExamSubmission(Long submissionId, int score, boolean isPassed, Exam exam, Student student) {
		super();
		this.submissionId = submissionId;
		this.score = score;
		this.isPassed = isPassed;
		this.exam = exam;
		this.student = student;
	}

	public ExamSubmission() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

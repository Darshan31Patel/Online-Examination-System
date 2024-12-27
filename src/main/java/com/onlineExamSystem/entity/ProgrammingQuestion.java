package com.onlineExamSystem.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
public class ProgrammingQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long quesId;
	
	private String question;
	@Column(columnDefinition = "TEXT")
	private String answer;
	
	@Enumerated(EnumType.STRING)
	private DifficultyLevel difficulty;
	
	public enum DifficultyLevel {
		EASY, MEDIUM, HARD
	}

	@ManyToOne
	@JoinColumn(name = "adminId")
	private Admin admin;
	
	public ProgrammingQuestion(Long quesId, String question, String answer, DifficultyLevel difficulty, Admin admin) {
		super();
		this.quesId = quesId;
		this.question = question;
		this.answer = answer;
		this.difficulty = difficulty;
		this.admin = admin;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public Long getQuesId() {
		return quesId;
	}

	public void setQuesId(Long quesId) {
		this.quesId = quesId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public DifficultyLevel getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(DifficultyLevel difficulty) {
		this.difficulty = difficulty;
	}

	@Override
	public String toString() {
		return "ProgrammingQuestion [quesId=" + quesId + ", question=" + question + ", answer=" + answer
				+ ", difficulty=" + difficulty + ", admin=" + admin + "]";
	}

	public ProgrammingQuestion() {
		super();
		// TODO Auto-generated constructor stub
	}
	
}

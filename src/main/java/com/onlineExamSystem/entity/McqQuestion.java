package com.onlineExamSystem.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class McqQuestion {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long questionId;

	@OneToMany(mappedBy = "ques", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<McqOption> options;

	private String question;
	
	@Enumerated(EnumType.STRING)
	private Difficulty difficulty;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	public enum Category {
		LOGICAL, TECHNICAL, PROGRAMMING
	}
	public enum Difficulty{
		EASY,MEDIUM,HARD
	}
	
	@ManyToOne
	@JoinColumn(name = "adminId")
	private Admin admin;

	public Long getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public List<McqOption> getOptions() {
		return options;
	}

	public void setOptions(List<McqOption> options) {
		this.options = options;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Difficulty getDifficulty() {
		return difficulty;
	}

	public void setDifficulty(Difficulty difficulty) {
		this.difficulty = difficulty;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}
	
	

	@Override
	public String toString() {
		return "McqQuestion [questionId=" + questionId +  ", question=" + question
				+ ", difficulty=" + difficulty + ", category=" + category + ", admin=" + admin + "]";
	}

	public McqQuestion(Long questionId, List<McqOption> options, String question, Difficulty difficulty,
			Category category, Admin admin) {
		super();
		this.questionId = questionId;
		this.options = options;
		this.question = question;
		this.difficulty = difficulty;
		this.category = category;
		this.admin = admin;
	}

	public McqQuestion() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	
	
}

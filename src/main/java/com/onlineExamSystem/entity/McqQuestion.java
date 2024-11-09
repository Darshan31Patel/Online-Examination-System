package com.onlineExamSystem.entity;

import java.util.List;
import java.util.Locale.Category;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
	public Long getQuestionId() {
		return questionId;
	}
	
	@OneToMany(mappedBy = "ques", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<McqOption> options;


	public List<McqOption> getOptions() {
		return options;
	}

	public McqQuestion() {
		super();
		// TODO Auto-generated constructor stub
	}

	public void setOptions(List<McqOption> options) {
		this.options = options;
	}

	public McqQuestion(Long questionId, String question, Category category) {
		super();
		this.questionId = questionId;
		this.question = question;
		this.category = category;
	}

	@Override
	public String toString() {
		return "McqQuestion [questionId=" + questionId + ", question=" + question + ", category=" + category + "]";
	}

	public void setQuestionId(Long questionId) {
		this.questionId = questionId;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}

	private String question;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	public enum Category {
		LOGICAL, TECHNICAL, PROGRAMMING
	}
}

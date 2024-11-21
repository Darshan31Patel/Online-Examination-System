package com.onlineExamSystem.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

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

	@JsonProperty("isCorrect")
	private boolean isCorrect;
	public Long getOptionId() {
		return optionId;
	}

	public McqOption(Long optionId, String optionText, boolean isCorrect, McqQuestion ques) {
		super();
		this.optionId = optionId;
		this.optionText = optionText;
		this.isCorrect = isCorrect;
		this.ques = ques;
	}

	@Override
	public String toString() {
		return "McqOption [optionId=" + optionId + ", optionText=" + optionText + ", isCorrect=" + isCorrect + ", ques="
				+ ques + "]";
	}

	public void setOptionId(Long optionId) {
		this.optionId = optionId;
	}

	public String getOptionText() {
		return optionText;
	}

	public void setOptionText(String optionText) {
		this.optionText = optionText;
	}

	public boolean isCorrect() {
		return isCorrect;
	}

	public void setCorrect(boolean isCorrect) {
		this.isCorrect = isCorrect;
	}

	public McqQuestion getQues() {
		return ques;
	}

	public void setQues(McqQuestion ques) {
		this.ques = ques;
	}

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long optionId;
	
	private String optionText;
	public McqOption() {
		super();
		// TODO Auto-generated constructor stub
	}

	
	@ManyToOne
	@JoinColumn(name="question_id")
	private McqQuestion ques;
}

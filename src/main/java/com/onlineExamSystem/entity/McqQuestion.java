package com.onlineExamSystem.entity;

import java.util.Locale.Category;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
	private String question;
	
	@Enumerated(EnumType.STRING)
	private Category category;
	
	public enum Category {
		LOGICAL, TECHNICAL, PROGRAMMING
	}
}

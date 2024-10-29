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
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long studentId;
	
	private String name;
	private String email;
	private String rollNo;
	private String password;
	
	@ManyToOne
	@JoinColumn(name = "created_adminID")
	private Admin adminName;
}

package com.onlineExamSystem.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Exam {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long examId;
	
	private String examName;
	private int passingMarks;
	
	@ManyToMany
	@JoinTable(name = "exam_mcq_ques", joinColumns = @JoinColumn(name="exam_id"),
	inverseJoinColumns = @JoinColumn(name="ques_id"))
	private List<McqQuestion> mcqQues;
	
	@ManyToMany
	@JoinTable(name = "exam_program_ques", joinColumns = @JoinColumn(name="exam_id"),
	inverseJoinColumns = @JoinColumn(name="ques_id"))
	private List<ProgrammingQuestion> programQues;
}

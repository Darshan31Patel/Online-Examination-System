package com.onlineExamSystem.entity;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
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
	private LocalDateTime startTime;
	private LocalDateTime endTime;
	
	@ManyToMany
	@JoinTable(name = "exam_mcq_ques", joinColumns = @JoinColumn(name="exam_id"),
	inverseJoinColumns = @JoinColumn(name="ques_id"))
	private List<McqQuestion> mcqQues;
	
	@ManyToMany
	@JoinTable(name = "exam_program_ques", joinColumns = @JoinColumn(name="exam_id"),
	inverseJoinColumns = @JoinColumn(name="ques_id"))
	private List<ProgrammingQuestion> programQues;
	
	@ManyToOne
	@JoinColumn(name = "adminId")
	private Admin admin;

	public Admin getAdmin() {
		return admin;
	}

	public void setAdmin(Admin admin) {
		this.admin = admin;
	}

	public Long getExamId() {
		return examId;
	}

	public void setExamId(Long examId) {
		this.examId = examId;
	}

	public String getExamName() {
		return examName;
	}

	public void setExamName(String examName) {
		this.examName = examName;
	}

	public int getPassingMarks() {
		return passingMarks;
	}

	public void setPassingMarks(int passingMarks) {
		this.passingMarks = passingMarks;
	}

	public LocalDateTime getStartTime() {
		return startTime;
	}

	public void setStartTime(LocalDateTime startTime) {
		this.startTime = startTime;
	}

	public LocalDateTime getEndTime() {
		return endTime;
	}

	public void setEndTime(LocalDateTime endTime) {
		this.endTime = endTime;
	}

	public List<McqQuestion> getMcqQues() {
		return mcqQues;
	}

	public void setMcqQues(List<McqQuestion> mcqQues) {
		this.mcqQues = mcqQues;
	}

	public List<ProgrammingQuestion> getProgramQues() {
		return programQues;
	}

	public void setProgramQues(List<ProgrammingQuestion> programQues) {
		this.programQues = programQues;
	}

	@Override
	public String toString() {
		return "Exam [examId=" + examId + ", examName=" + examName + ", passingMarks=" + passingMarks + ", startTime="
				+ startTime + ", endTime=" + endTime + ", mcqQues=" + mcqQues + ", programQues=" + programQues + "]";
	}

	public Exam(Long examId, String examName, int passingMarks, LocalDateTime startTime, LocalDateTime endTime,
			List<McqQuestion> mcqQues, List<ProgrammingQuestion> programQues) {
		super();
		this.examId = examId;
		this.examName = examName;
		this.passingMarks = passingMarks;
		this.startTime = startTime;
		this.endTime = endTime;
		this.mcqQues = mcqQues;
		this.programQues = programQues;
	}

	public Exam() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}

package com.onlineExamSystem.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Student {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long studentId;
	
	private String name;
	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRollNo() {
		return rollNo;
	}

	public void setRollNo(String rollNo) {
		this.rollNo = rollNo;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Admin getAdminName() {
		return adminName;
	}

	public void setAdminName(Admin adminName) {
		this.adminName = adminName;
	}

	private String email;
	private String rollNo;
	public Student(Long studentId, String name, String email, String rollNo, String password, Admin adminName) {
		super();
		this.studentId = studentId;
		this.name = name;
		this.email = email;
		this.rollNo = rollNo;
		this.password = password;
		this.adminName = adminName;
	}

	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Student [studentId=" + studentId + ", name=" + name + ", email=" + email + ", rollNo=" + rollNo
				+ ", password=" + password + ", adminName=" + adminName + "]";
	}
	
	private String password;
	
	@ManyToOne
	@JoinColumn(name = "created_adminID")
	private Admin adminName;
}

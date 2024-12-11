package com.onlineExamSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {
	List<Exam> findByAdmin(Admin admin);
}

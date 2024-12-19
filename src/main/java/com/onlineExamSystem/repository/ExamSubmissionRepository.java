package com.onlineExamSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.ExamSubmission;
import com.onlineExamSystem.entity.Student;

public interface ExamSubmissionRepository extends JpaRepository<ExamSubmission, Long>{
	List<ExamSubmission> findByExam(Exam exam);
	List<ExamSubmission> findByStudent(Student student);
}

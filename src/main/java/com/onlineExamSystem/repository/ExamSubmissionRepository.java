package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.ExamSubmission;

public interface ExamSubmissionRepository extends JpaRepository<ExamSubmission, Long>{

}

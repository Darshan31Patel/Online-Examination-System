package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.Exam;

public interface ExamRepository extends JpaRepository<Exam, Long> {

}

package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.McqQuestion;

public interface McqQuestionRepository extends JpaRepository<McqQuestion, Long>{

}

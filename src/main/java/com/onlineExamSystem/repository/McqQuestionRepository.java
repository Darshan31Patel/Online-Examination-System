package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.McqQuestion;
import java.util.List;


public interface McqQuestionRepository extends JpaRepository<McqQuestion, Long>{
	McqQuestion findByQuestionId(Long questionId);
}

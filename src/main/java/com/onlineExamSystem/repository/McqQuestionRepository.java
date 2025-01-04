package com.onlineExamSystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.McqQuestion;
import java.util.List;
import com.onlineExamSystem.entity.McqQuestion.Difficulty;
import com.onlineExamSystem.entity.McqQuestion.Category;



public interface McqQuestionRepository extends JpaRepository<McqQuestion, Long>{
	McqQuestion findByQuestionId(Long questionId);
	List<McqQuestion> findByCategoryAndDifficulty(Category category, Difficulty difficulty);
}

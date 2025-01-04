package com.onlineExamSystem.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.onlineExamSystem.entity.ProgrammingQuestion;
import com.onlineExamSystem.entity.ProgrammingQuestion.DifficultyLevel;

public interface ProgrammingQuestionRepository extends JpaRepository<ProgrammingQuestion, Long>{
	ProgrammingQuestion findByQuesId(Long quesId);
	List<ProgrammingQuestion> findByDifficulty(DifficultyLevel difficulty);
}

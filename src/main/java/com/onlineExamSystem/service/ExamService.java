package com.onlineExamSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.entity.ProgrammingQuestion;
import com.onlineExamSystem.repository.ExamRepository;
import com.onlineExamSystem.repository.McqQuestionRepository;
import com.onlineExamSystem.repository.ProgrammingQuestionRepository;

@Service
public class ExamService {

	@Autowired
	ExamRepository examRepository;
	@Autowired
	McqQuestionRepository mcqQuestionRepository;
	@Autowired
	ProgrammingQuestionRepository programmingQuestionRepository;
	
	public void createExam(Exam exam) {
		List<McqQuestion> mcqQuestions = mcqQuestionRepository.findAllById(exam.getMcqQues().stream().map(McqQuestion::getQuestionId).toList());
		exam.setMcqQues(mcqQuestions);
		
		List<ProgrammingQuestion> programmingQuestions = programmingQuestionRepository.findAllById(exam.getProgramQues().stream().map(ProgrammingQuestion::getQuesId).toList());
		exam.setProgramQues(programmingQuestions);
		examRepository.save(exam);
	}
	
	public List<Exam> getExamsDetails(Admin admin){
		return examRepository.findByAdmin(admin);
	}
	
	public Exam getExamById(long examId) {
		return examRepository.findByExamId(examId);
	}
}

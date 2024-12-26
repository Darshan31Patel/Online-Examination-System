package com.onlineExamSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.ExamSubmission;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.entity.ProgrammingQuestion;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.repository.ExamRepository;
import com.onlineExamSystem.repository.ExamSubmissionRepository;
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
	@Autowired
	ExamSubmissionRepository examSubmissionRepository;
	
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
	
	public Exam updateExam(long id,Exam updatedExam) {
		Exam existingExam = getExamById(id);
		existingExam.setExamName(updatedExam.getExamName());
        existingExam.setPassingMarks(updatedExam.getPassingMarks());
        existingExam.setStartTime(updatedExam.getStartTime());
        existingExam.setEndTime(updatedExam.getEndTime());
        existingExam.getMcqQues().addAll(updatedExam.getMcqQues());
        existingExam.getProgramQues().addAll(updatedExam.getProgramQues());
		return examRepository.save(existingExam);
	}
	
	public ExamSubmission saveMarks(ExamSubmission examSubmission) {
		return examSubmissionRepository.save(examSubmission);
	}
	
	public List<ExamSubmission> getMarksByExamId(Long examId) {
		Exam exam = getExamById(examId);
		return examSubmissionRepository.findByExam(exam);
	}
	
	public List<ExamSubmission> getMarksByStudent(Student student) {
		return examSubmissionRepository.findByStudent(student);
	}
}

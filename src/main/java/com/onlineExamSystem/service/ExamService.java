package com.onlineExamSystem.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.Admin;
import com.onlineExamSystem.entity.Exam;
import com.onlineExamSystem.entity.ExamSubmission;
import com.onlineExamSystem.entity.McqAnswer;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.entity.McqQuestion.Category;
import com.onlineExamSystem.entity.McqQuestion.Difficulty;
import com.onlineExamSystem.entity.ProgrammingAnswer;
import com.onlineExamSystem.entity.ProgrammingQuestion;
import com.onlineExamSystem.entity.ProgrammingQuestion.DifficultyLevel;
import com.onlineExamSystem.entity.Student;
import com.onlineExamSystem.repository.ExamRepository;
import com.onlineExamSystem.repository.ExamSubmissionRepository;
import com.onlineExamSystem.repository.McqAnswerRepository;
import com.onlineExamSystem.repository.McqQuestionRepository;
import com.onlineExamSystem.repository.ProgrammingAnswerRepository;
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
	@Autowired
	ProgrammingAnswerRepository programmingAnswerRepository;
	@Autowired
	McqAnswerRepository mcqAnswerRepository;
	
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
	
	public List<ProgrammingAnswer> saveProgrammingAnswer(List<ProgrammingAnswer> programmingAnswers) {
		return programmingAnswerRepository.saveAll(programmingAnswers);
	}
	
	public List<McqAnswer> saveMcqAnswers(List<McqAnswer> mcqAnswers){
		return mcqAnswerRepository.saveAll(mcqAnswers);
	}
	
	public List<ExamSubmission> getMarksByExamId(Long examId) {
		Exam exam = getExamById(examId);
		return examSubmissionRepository.findByExam(exam);
	}				
	
	public List<ExamSubmission> getMarksByStudent(Student student) {
		return examSubmissionRepository.findByStudent(student);
	}
	
	public List<McqQuestion> getMcqByRatio(Category category, int totalQues){
		int hardCount = (int) Math.round(totalQues * 0.2);
	    int mediumCount = (int) Math.round(totalQues * 0.4);
	    int easyCount = totalQues - hardCount - mediumCount;
	    
	    List<McqQuestion> easyQuestions = mcqQuestionRepository.findByCategoryAndDifficulty(category, Difficulty.EASY);
	    List<McqQuestion> mediumQuestions = mcqQuestionRepository.findByCategoryAndDifficulty(category, Difficulty.MEDIUM);
	    List<McqQuestion> hardQuestions = mcqQuestionRepository.findByCategoryAndDifficulty(category, Difficulty.HARD);

	    Collections.shuffle(easyQuestions);
	    Collections.shuffle(mediumQuestions);
	    Collections.shuffle(hardQuestions);
	    
	    List<McqQuestion> selectedQuestions = new ArrayList<>();
	    selectedQuestions.addAll(easyQuestions.stream().limit(easyCount).toList());
	    selectedQuestions.addAll(mediumQuestions.stream().limit(mediumCount).toList());
	    selectedQuestions.addAll(hardQuestions.stream().limit(hardCount).toList());
	    
	    return selectedQuestions;
	}
	
	private List<ProgrammingQuestion> getProgrammingQuestionsByRatio(int totalQuestions) {
	    int easyCount = (int) Math.round(totalQuestions * 0.4);
	    int mediumCount = (int) Math.round(totalQuestions * 0.4);
	    int hardCount = totalQuestions - easyCount - mediumCount;

	    List<ProgrammingQuestion> easyQuestions = programmingQuestionRepository.findByDifficulty(DifficultyLevel.EASY);
	    List<ProgrammingQuestion> mediumQuestions = programmingQuestionRepository.findByDifficulty(DifficultyLevel.MEDIUM);
	    List<ProgrammingQuestion> hardQuestions = programmingQuestionRepository.findByDifficulty(DifficultyLevel.HARD);

	    Collections.shuffle(easyQuestions);
	    Collections.shuffle(mediumQuestions);
	    Collections.shuffle(hardQuestions);

	    List<ProgrammingQuestion> selectedQuestions = new ArrayList<>();
	    selectedQuestions.addAll(easyQuestions.stream().limit(easyCount).toList());
	    selectedQuestions.addAll(mediumQuestions.stream().limit(mediumCount).toList());
	    selectedQuestions.addAll(hardQuestions.stream().limit(hardCount).toList());

	    return selectedQuestions;
	}
	
	public Exam autoCreateExam(Map<String, String> examData) {
		Exam exam = new Exam();
		exam.setEndTime(LocalDateTime.parse(examData.get("endTime").toString()));
		exam.setStartTime(LocalDateTime.parse(examData.get("startTime").toString()));
		exam.setExamName(examData.get("examName").toString());
		exam.setPassingMarks(Integer.parseInt(examData.get("passingMarks").toString()));
		
		int numberTechnicalQues = Integer.parseInt(examData.get("numberTechnicalQues"));
	    int numberLogicalQues = Integer.parseInt(examData.get("numberLogicalQues"));
	    int numberProgrammingQues = Integer.parseInt(examData.get("numberProgrammingQues"));
	    int numberCodingQues = Integer.parseInt(examData.get("numberCodingQues"));
	    
	    List<McqQuestion> technicalQuestions = getMcqByRatio(Category.TECHNICAL, numberTechnicalQues);
	    List<McqQuestion> logicalQuestions = getMcqByRatio(Category.LOGICAL, numberLogicalQues);
	    List<McqQuestion> programmingQuestions = getMcqByRatio(Category.PROGRAMMING,numberProgrammingQues);
//	    System.out.println(technicalQuestions);
		
	    List<ProgrammingQuestion> codingQuestions = getProgrammingQuestionsByRatio(numberCodingQues);
//	    System.out.println(codingQuestions);
	    
	    List<McqQuestion> allMcqQuestions = new ArrayList<>(technicalQuestions);
	    allMcqQuestions.addAll(logicalQuestions);
	    allMcqQuestions.addAll(programmingQuestions);
	    
	    exam.setMcqQues(allMcqQuestions);
	    exam.setProgramQues(codingQuestions);
	    
		return exam;
	}
}

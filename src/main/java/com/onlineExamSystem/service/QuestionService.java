package com.onlineExamSystem.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onlineExamSystem.entity.McqOption;
import com.onlineExamSystem.entity.McqQuestion;
import com.onlineExamSystem.entity.ProgrammingQuestion;
import com.onlineExamSystem.repository.McqOptionRepository;
import com.onlineExamSystem.repository.McqQuestionRepository;
import com.onlineExamSystem.repository.ProgrammingQuestionRepository;

@Service
public class QuestionService {

	@Autowired
	private McqQuestionRepository mcqQuestionRepository;
	@Autowired
	private McqOptionRepository mcqOptionRepository;
	@Autowired
	private ProgrammingQuestionRepository programmingQuestionRepository;
	
	public McqQuestion createQuestion(McqQuestion mcqQuestion) {
		return mcqQuestionRepository.save(mcqQuestion);
	}
	
	public McqQuestion getQuestion(Long questionId) {
		return mcqQuestionRepository.findById(questionId).orElse(null);
	}
	
	public List<McqQuestion> getAllQuestion() {
		return mcqQuestionRepository.findAll();
	}
	
	public McqQuestion updateQuestion(Long questionId, McqQuestion updatedQuestion) {
        if(mcqQuestionRepository.existsById(questionId)) {
            updatedQuestion.setQuestionId(questionId);
            return mcqQuestionRepository.save(updatedQuestion);
        }
        return null;
    }
	
	public String deleteQuestion(Long questionId) {
        if(mcqQuestionRepository.existsById(questionId)) {
            mcqQuestionRepository.deleteById(questionId);
            return "Question deleted successfully";
        }
        return "Question not found";
    }
	
	public McqOption addOption(Long quesId, McqOption mcqOption) {
		McqQuestion mcqQuestion = mcqQuestionRepository.findById(quesId).orElse(null);
		if (mcqQuestion != null) {
            mcqOption.setQues(mcqQuestion);
            return mcqOptionRepository.save(mcqOption);
        }
        return null;
	}
	
	public List<McqOption> getOptionsByQuestion(Long questionId) {
        McqQuestion question = mcqQuestionRepository.findById(questionId).orElse(null);
        if (question != null) {
            return question.getOptions();
        }
        return null;
    }

    public String deleteOption(Long optionId) {
        if (mcqOptionRepository.existsById(optionId)) {
            mcqOptionRepository.deleteById(optionId);
            return "Option deleted successfully";
        }
        return "Option not found";
    }
    
    public String addProgQues(ProgrammingQuestion ques) {
    	programmingQuestionRepository.save(ques);
		return ques.toString();
	}
    
    public List<ProgrammingQuestion> getAllProgrammingQuestions() {
		return programmingQuestionRepository.findAll();
	}
    
}

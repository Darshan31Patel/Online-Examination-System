import React from 'react';

function QuestionDetailContainer({ question, category, options }) {
    return (
        <div className="border p-4 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-bold mb-2">{question}</h3>
            <p className="mb-2"><strong>Category:</strong> {category}</p>
            <div className="space-y-2">
                {options && options.length > 0 ? (
                    options.map(option => (
                        <div key={option.optionId} className="flex items-center">
                            <input 
                                type="radio" 
                                id={`option${option.optionId}`} 
                                name={`question${option.optionId}`} 
                                disabled 
                                checked={option.isCorrect}
                            />
                            <label htmlFor={`option${option.optionId}`} className="ml-2">
                                {option.optionText} {option.isCorrect && <span className="text-green-600">(Correct)</span>}
                            </label>
                        </div>
                    ))
                ) : (
                    <p>No options available</p>
                )}
            </div>
        </div>
    );
}

export default QuestionDetailContainer;

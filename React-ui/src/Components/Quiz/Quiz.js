// Quiz.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Quiz = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [score, setScore] = useState(0);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:3000/questions');
                setQuestions(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId, answer) => {
        setUserAnswers((prevUserAnswers) => ({ ...prevUserAnswers, [questionId]: answer }));
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevCurrentQuestion) => prevCurrentQuestion + 1);
        } else {
            calculateScore();
        }
    };

    const calculateScore = () => {
        let correctAnswers = 0;
        questions.forEach((question) => {
            if (userAnswers[question.id] === question.correctAnswer) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);
    };

    return (
        <div>
            {questions.length > 0 && (
                <div>
                    <h2>Question {currentQuestion + 1} of {questions.length}</h2>
                    <p>{questions[currentQuestion].question}</p>
                    <ul>
                        {questions[currentQuestion].options.map((option, index) => (
                            <li key={index}>
                                <input
                                    type="radio"
                                    name={`question-${questions[currentQuestion].id}`}
                                    value={option}
                                    checked={userAnswers[questions[currentQuestion].id] === option}
                                    onChange={() => handleAnswerChange(questions[currentQuestion].id, option)}
                                />
                                <span>{option}</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleNextQuestion}>Next Question</button>
                </div>
            )}
            {score > 0 && (
                <div>
                    <h2>Quiz Complete!</h2>
                    <p>Your score is {score} out of {questions.length}</p>
                </div>
            )}
        </div>
    );
};

export default Quiz;

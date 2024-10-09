"use client";
import { useState, useEffect } from "react";
import StatCard from "./StatCard";

interface QuizProps {
  questions: {
    question: string;
    answers: string[];
    correctAnswer: string;
  }[];
  userId: string | undefined;
}

const Quiz = ({ questions, userId }: QuizProps) => {
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  });
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [timerRunning, setTimerRunning] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timerSetting, setTimerSetting] = useState(15); // Default to 15 minutes
  const [showInstructions, setShowInstructions] = useState(true);
  const [instructionsAccepted, setInstructionsAccepted] = useState(false);
  const [randomQuestions, setRandomQuestions] = useState<typeof questions>([]);

  useEffect(() => {
    if (questions && questions.length) {
      const randomizedQuestions = [...questions]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setRandomQuestions(randomizedQuestions);
    }
  }, [questions]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {

      event.preventDefault();

      return;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    setTimeRemaining(timerSetting * 60); // Convert minutes to seconds
  };

  const handleTimeUp = () => {
    stopTimer();
    setShowResults(true); // Show results directly when time runs out
    saveQuizResults(); // Save quiz results
  };

  const startQuiz = () => {
    setQuizStarted(true);
    resetTimer();
    startTimer();
  };

  const onAnswerSelected = (answer: string) => {
    setChecked(true);
    const newSelectedAnswers = [...selectedAnswers];
    newSelectedAnswers[activeQuestion] = answer;
    setSelectedAnswers(newSelectedAnswers);
  };

  const nextQuestion = () => {
    if (randomQuestions.length > 0 && randomQuestions[activeQuestion]) {
      const { correctAnswer } = randomQuestions[activeQuestion];
      // Check if an answer was selected
      if (selectedAnswers[activeQuestion] !== undefined) {
        // Only update score and counters if an answer was chosen
        if (selectedAnswers[activeQuestion] === correctAnswer) {
          setResults((prev) => ({
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }));
        } else {
          setResults((prev) => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }));
        }
      }
      if (activeQuestion !== randomQuestions.length - 1) {
        setActiveQuestion((prev) => prev + 1);
      } else {
        setShowResults(true);
        stopTimer();
        saveQuizResults();
      }
    }
    setChecked(false);
  };

  const previousQuestion = () => {
    if (activeQuestion !== 0) {
      const newActiveQuestion = activeQuestion - 1;
      if (selectedAnswers[newActiveQuestion]) {
        setChecked(true);
      } else {
        setChecked(false);
      }
      setActiveQuestion(newActiveQuestion);
    }
  };

  const saveQuizResults = () => {
    fetch("/api/quizResults", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        quizScore: results.score,
        correctAnswers: results.correctAnswers,
        wrongAnswers: results.wrongAnswers,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response isn't working");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Quiz results saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving quiz results:", error);
      });
  };

  const restartQuiz = () => {
    setActiveQuestion(0);
    setSelectedAnswers([]);
    setChecked(false);
    setShowResults(false);
    setResults({ score: 0, correctAnswers: 0, wrongAnswers: 0 });
    resetTimer();
    setQuizStarted(false);
    setShowInstructions(true);
  };

  const acceptInstructions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInstructionsAccepted(event.target.checked);
  };

  const goToNextPage = () => {
    setShowInstructions(false);
  };

  const unattemptedQuestions = randomQuestions.length - (results.correctAnswers + results.wrongAnswers);

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  if (randomQuestions.length === 0) return <div>Loading...</div>;

  const { question, answers } = randomQuestions[activeQuestion] || { question: "", answers: [] };

  return (
    <div className="min-h-[500px]">
      <div className="max-w-[1500px] mx-auto w-[90%] flex justify-center py-10 flex-col">
        {showInstructions ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Instructions*</h2>
            <div className="mb-4">
              {[
                "Read each question carefully.",
                "You have a total of 10 questions to answer.",
                "Choose the correct answer from the options provided.",
                "You have a limited time to answer each question.",
                "Click on 'Next Question' to proceed to the next question.",
                "Your score will be calculated at the end of the quiz.",
                "Good luck!",
              ].map((instruction, index) => (
                <div
                  key={index}
                  className="bg-white bg-opacity-80 border rounded shadow p-4 my-2 mx-auto w-3/4"
                >
                  {instruction}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={instructionsAccepted}
                  onChange={acceptInstructions}
                  className="mr-2"
                  style={{ width: "20px", height: "20px" }}
                />
                <span className="text-primary">I Accept</span>
              </label>
              <button
                onClick={goToNextPage}
                disabled={!instructionsAccepted}
                className={`bg-primary text-white px-4 py-2 rounded shadow transition-colors duration-500 hover:bg-primary/80 ${!instructionsAccepted ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                Next
              </button>
            </div>
          </div>
        ) : !quizStarted ? (
          <div className="text-center shadow border w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto px-5 py-5 rounded-md">
            <h2 className="text-2xl font-bold mb-4">Welcome to the mock test!</h2>
            <div className="mb-4">
              <label className="mr-2" htmlFor="timerSetting">
                Set Timer (minutes):
              </label>
              <input
                type="number"
                id="timerSetting"
                value={timerSetting}
                onChange={(e) => setTimerSetting(Number(e.target.value))}
                min={1}
                className="border rounded px-2"
              />
            </div>
            <p className="mb-4 text-sm text-gray-500">
              Choose the time as per your requirements.
            </p>
            <button
              onClick={startQuiz}
              className="bg-primary text-white px-4 py-2 rounded shadow transition-colors duration-500 hover:bg-primary/80"
            >
              Start Test
            </button>
          </div>
        ) : (
          <>
            {!showResults ? (
              <>
                <div className="flex justify-between mb-10 items-center">
                  <div className="border shadow text-dark px-4 rounded-md py-1">
                    <h2>
                      Question: {activeQuestion + 1}
                      <span>/{randomQuestions.length}</span>
                    </h2>
                  </div>

                  <div className=" border shadow text-dark px-4 rounded-md py-1">
                    {formatTime(timeRemaining)} left
                  </div>
                </div>

                <div>
                  <h3 className="mb-5 text-2xl font-bold">{question}</h3>
                  <ul className="relative">
                    {answers.map((answer: string, idx: number) => {
                      const optionLetters = ["A", "B", "C", "D"]; // Add more if needed
                      const isSelected = selectedAnswers[activeQuestion] === answer;
                      return (
                        <li
                          key={idx}
                          onClick={() => onAnswerSelected(answer)}
                          className={`cursor-pointer mb-5 py-3 pl-3 pr-3 rounded-md border relative ${isSelected
                            ? "bg-qborder text-dark"
                            : ""
                            }`}
                        >
                          {/* Letter positioned outside the border */}
                          <span
                            className={`absolute left-[-35px] text-sm w-6 h-6 flex items-center justify-center rounded-full border ${isSelected
                              ? "bg-options text-white"
                              : "bg-white text-black"
                              }`}
                          >
                            {optionLetters[idx]}
                          </span>
                          {/* The answer text */}
                          <span>{answer}</span>
                        </li>
                      );
                    })}
                  </ul>


                  <div className="flex justify-between mt-6">
                    <button
                      onClick={previousQuestion}
                      disabled={activeQuestion === 0}
                      className={`font-bold bg-primary text-white px-4 py-2 rounded shadow transition-colors duration-10 hover:bg-primary/80 ${activeQuestion === 0 ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      Previous Question
                    </button>
                    <button
                      onClick={nextQuestion}
                      // disabled={!checked}
                      className="font-bold bg-primary text-white px-4 py-2 rounded shadow transition-colors duration-10 hover:bg-primary/80"
                    >
                      {activeQuestion === randomQuestions.length - 1
                        ? "Finish"
                        : "Next Question →"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl uppercase mb-10">Results 📈</h3>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                  <StatCard
                    title="Percentage"
                    value={`${(
                      (results.score / (randomQuestions.length * 5)) * 100
                    ).toFixed(2)}%`}
                  />
                  <StatCard title="Total Questions" value={randomQuestions.length} />
                  <StatCard title="Total Score" value={results.score} />
                  <StatCard title="Correct Answers" value={results.correctAnswers} />
                  <StatCard title="Wrong Answers" value={results.wrongAnswers} />
                  <StatCard title="Unattempted Questions" value={unattemptedQuestions} />
                </div>
                <button
                  onClick={restartQuiz}
                  className="bg-primary text-white px-10 py-2 rounded-md mt-8 shadow transition-colors duration-500 hover:bg-primary/80"
                >
                  Restart Test
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Quiz;
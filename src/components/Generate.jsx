import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";

const Generate = () => {
  const { questions, getForm, parameter } = useContext(AppContext);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showHint, setShowHint] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  if (!questions || questions.length === 0) {
    return <div className="text-center mt-10">No questions available</div>;
  }

  const currentQuestion = questions[currentIndex];

  const handleOptionClick = (optionKey) => {
    if (answers[currentIndex]) return;

    setAnswers((prev) => ({
      ...prev,
      [currentIndex]: optionKey,
    }));
  };

  const rightCount = Object.keys(answers).filter(
    (i) => answers[i] === questions[i].correct_answer
  ).length;

  const wrongCount = Object.keys(answers).filter(
    (i) => answers[i] !== questions[i].correct_answer
  ).length;

  const handleMoreQuestions = async () => {
    setLoadingMore(true);

    const payload = {
      topic: parameter.topic,
      numberOfQuestions: 5, // load 5 more
      difficulty: parameter.difficulty,
    };

    await getForm(payload); // MUST append questions in context
    setLoadingMore(false);
  };

  return (
    <div className="flex gap-6 p-6 max-w-6xl mx-auto">
      {/* Question Section */}
      <div className="flex-1 bg-white shadow-md rounded-xl p-6">
        <h2 className="text-lg font-semibold mb-4">
          Question {currentIndex + 1} / {questions.length}
        </h2>

        <p className="mb-6 text-gray-800">{currentQuestion.question}</p>

        <div className="space-y-3">
          {Object.entries(currentQuestion.options).map(([key, value]) => {
            const selected = answers[currentIndex] === key;
            const isCorrect = currentQuestion.correct_answer === key;

            let style = "border border-gray-300 hover:bg-gray-100";

            if (selected && isCorrect) {
              style = "bg-green-500 text-white";
            } else if (selected && !isCorrect) {
              style = "bg-red-500 text-white";
            } else if (answers[currentIndex] && isCorrect) {
              style = "bg-green-100 border-green-400";
            }

            return (
              <button
                key={key}
                onClick={() => handleOptionClick(key)}
                className={`w-full text-left px-4 py-2 rounded-lg transition ${style}`}
              >
                <strong>{key}.</strong> {value}
              </button>
            );
          })}
        </div>

        {/* Hint */}
        {answers[currentIndex] && (
          <div className="mt-4">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-sm text-blue-600 underline"
            >
              {showHint ? "Hide Hint" : "Show Hint"}
            </button>

            {showHint && (
              <p className="mt-2 text-sm text-gray-600">
                {currentQuestion.hint}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-6">
          <button
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((i) => i - 1);
              setShowHint(false);
            }}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Back
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => {
                setCurrentIndex((i) => i + 1);
                setShowHint(false);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleMoreQuestions}
              disabled={loadingMore}
              className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-50"
            >
              {loadingMore ? "Loading..." : "More Questions"}
            </button>
          )}
        </div>
      </div>

      {/* Stats Section */}
      <div className="w-64 bg-gray-50 shadow-md rounded-xl p-4">
        <h3 className="font-semibold mb-4">Live Stats</h3>

        <div className="flex justify-between mb-2">
          <span>Correct</span>
          <span className="text-green-600 font-bold">{rightCount}</span>
        </div>

        <div className="flex justify-between mb-2">
          <span>Wrong</span>
          <span className="text-red-600 font-bold">{wrongCount}</span>
        </div>

        <div className="flex justify-between">
          <span>Total Attempted</span>
          <span className="font-bold">{Object.keys(answers).length}</span>
        </div>
      </div>
    </div>
  );
};

export default Generate;

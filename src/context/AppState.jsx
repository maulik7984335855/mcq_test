import React from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const [questions, setQuestions] = React.useState([]);
  const [parameter, setParameter] = React.useState({});

  const getForm = async (payload) => {
    console.log("State Payload:", payload);

    const res = await axios.post("http://localhost:4000/api/generate", {
      topic: payload.topic,
      numberOfQuestions: payload.numberOfQuestions,
      difficulty: payload.difficulty,
    });

    // ✅ backend returns: { success, topic, difficulty, questions }

    // store parameters
    setParameter({
      topic: res.data.topic,
      difficulty: res.data.difficulty,
    });

    // ✅ append questions (FIXED)
    setQuestions((prev) => [
      ...prev,
      ...res.data.questions,
    ]);
  };

  return (
    <AppContext.Provider
      value={{
        getForm,
        questions,
        parameter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;

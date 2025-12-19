import React from "react";
import { Formik } from "formik";
import { useContext } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const { getForm } = useContext(AppContext);
  const navigate = useNavigate()
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Generate MCQ Quiz
        </h1>

        <Formik
          initialValues={{
            topic: "",
            numberOfQuestions: "",
            customCount: "",
            difficulty: "",
          }}
          validate={(values) => {
            const errors = {};

            if (!values.topic) {
              errors.topic = "Topic is required";
            }

            if (!values.numberOfQuestions) {
              errors.numberOfQuestions = "Select number of questions";
            }

            if (values.numberOfQuestions === "custom" && !values.customCount) {
              errors.customCount = "Enter custom number";
            }

            if (!values.difficulty) {
              errors.difficulty = "Select difficulty";
            }

            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const payload = {
              topic: values.topic,
              numberOfQuestions:
                values.numberOfQuestions === "custom"
                  ? values.customCount
                  : values.numberOfQuestions,
              difficulty: values.difficulty,
            };
            getForm(payload)
            // alert(JSON.stringify(payload, null, 2));
            // console.log("Form Payload: ",payload);
            navigate("/generate")
            setSubmitting(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Topic */}
              <div>
                <input
                  type="text"
                  name="topic"
                  placeholder="Enter Topic (e.g. React)"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.topic}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {errors.topic && touched.topic && (
                  <p className="text-red-500 text-sm mt-1">{errors.topic}</p>
                )}
              </div>

              {/* Number of Questions */}
              <div>
                <select
                  name="numberOfQuestions"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.numberOfQuestions}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select number of questions</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="custom">Custom</option>
                </select>

                {errors.numberOfQuestions && touched.numberOfQuestions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.numberOfQuestions}
                  </p>
                )}
              </div>

              {/* Custom Number */}
              {values.numberOfQuestions === "custom" && (
                <div>
                  <input
                    type="number"
                    name="customCount"
                    placeholder="Enter custom number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.customCount}
                    className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  {errors.customCount && touched.customCount && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.customCount}
                    </p>
                  )}
                </div>
              )}

              {/* Difficulty */}
              <div>
                <select
                  name="difficulty"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.difficulty}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="">Select difficulty</option>
                  <option value="basic">Basic</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>

                {errors.difficulty && touched.difficulty && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.difficulty}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
              >
                Generate Quiz
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Form;

"use client";

import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
import { useState } from "react";
import { json } from "../../data/survey_json.js";
import { surveyTheme } from "../../data/survey_theme_json.js";

export default function SurveyComponent() {
  const [error, setError] = useState<string | null>(null);

  const model = new Model(json);
  model.applyTheme(surveyTheme);

  model.onComplete.add(async (survey, options) => {
    options.showSaveInProgress();

    try {
      const response = await fetch("/api/recruitment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(survey.data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit survey");
      }

      options.showSaveSuccess();
      setError(null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";
      console.error("Failed to save survey results:", error);
      setError(errorMessage);
      options.showSaveError();
    }
  });

  return !error ? (
    <Survey model={model} />
  ) : (
    <>
      {error && (
        <div className="w-full h-dvh text-center space-y-2 py-3 bg-black">
          <p className="font-bold text-white text-2xl">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-sm bg-white p-2 rounded"
          >
            Dismiss
          </button>
        </div>
      )}
    </>
  );
}

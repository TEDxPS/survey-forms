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

  // model.onUploadFiles.add(async (_, options) => {
  //   const formData = new FormData();
  //   options.files.forEach((file) => {
  //     formData.append(file.name, file);
  //   });

  //   fetch("/api/recruitment/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       options.callback(
  //         options.files.map((file) => {
  //           return {
  //             file: file,
  //             content: data[file.name],
  //           };
  //         })
  //       );
  //     })
  //     .catch((error) => {
  //       console.error("Error: ", error);
  //       options.callback([], ["An error occurred during file upload."]);
  //     });
  // });

  model.onAfterRenderPage.add(() => {
    const elements = document.getElementsByClassName("sd-description");
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (element.innerHTML.includes("pdf+button")) {
        const button = document.createElement("button");

        for (const attr of Array.from(element.attributes)) {
          button.setAttribute(attr.name, attr.value);
        }

        button.className = "text-[#eb0028] underline";
        button.innerHTML = "Click here to take test";
        button.onclick = () => {
          window.open("https://www.example.com", "_blank");
        };
        element.parentNode?.replaceChild(button, element);
      }
    }
  });

  return !error ? (
    <Survey model={model} />
  ) : (
    <>
      {error && (
        <div className="w-full text-center space-y-2 py-3 bg-[#1c1c1c]">
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

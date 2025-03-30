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

    const enrichedData = { ...survey.data };
    const questions = survey.getAllQuestions();
    
    questions.forEach(question => {
      const value = survey.data[question.name];
      if (value) {
        if (question.choices) {
          // Handle questions with choices
          const choice = question.choices.find((c: { value: string; text: string }) => c.value === value);
          if (choice) {
            enrichedData[question.name] = {
              value: choice.value,
              question_title: question.title,
              answer_text: choice.text
            };
          }
        } else {
          // Handle questions without choices (text, email, etc.)
          enrichedData[question.name] = {
            value: value,
            question_title: question.title,
            answer_text: value
          };
        }
      }
    });

    console.log("Enriched Survey data: ", enrichedData);

    try {
      const response = await fetch("/api/recruitment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrichedData),
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

  /* Render PDF Button */
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
          window.open("https://drive.google.com/file/d/1cAl2GKDqrCAJWbZkw63N8ZNEzsa6Prfg/view?usp=sharing", "_blank");
        };
        element.parentNode?.replaceChild(button, element);
      }
    }
  });

  /* File upload function */
  model.onUploadFiles.add(async (_, options) => {
    const formData = new FormData();
    options.files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await fetch("/api/recruitment/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Data: ", data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to upload files");
      }

      console.log("Success: ", data);
      options.callback(
        options.files.map((file) => {
          return {
            file: file,
            content: data["fileUrl"],
          };
        })
      );
    } catch (e) {
      console.error("Error on upload file: ", error);
      options.callback([], ["An error occurred during file upload."]);
    }
  });

  model.onDownloadFile.add(async (_, options) => {
    try {
      const response = await fetch(options.content);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to download file");
      }

      const blob = await response.blob();

      const file = new File([blob], options.fileValue.name, {
        type: options.fileValue.type,
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        options.callback("success", e.target?.result || "");
      };
      reader.readAsDataURL(file);
    } catch (e) {
      console.error("Error on get file: ", error);
      options.callback("error");
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

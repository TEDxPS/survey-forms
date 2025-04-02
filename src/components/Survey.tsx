"use client";

import { useState, useEffect } from "react";
import { Model, SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
import { json } from "../../data/survey_json.js";
import { surveyTheme } from "../../data/survey_theme_json.js";

interface Choice {
  value: string;
  text: string;
}

interface FileValue {
  name: string;
  type: string;
}

interface UploadOptions {
  files: File[];
  callback: (
    files: { file: File; content: string }[],
    errors?: string[]
  ) => void;
}

interface DownloadOptions {
  content: string;
  fileValue: FileValue;
  callback: (status: "success" | "error", data?: string) => void;
}

interface CompleteOptions {
  showSaveInProgress: () => void;
  showSaveSuccess: () => void;
  showSaveError: () => void;
}

export default function SurveyComponent() {
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [surveyModel] = useState(() => {
    const model = new Model(json);
    model.applyTheme(surveyTheme);
    return model;
  });

  const firstChoiceQuestion = json.pages[0].elements.find(
    (element) =>
      element.name === "first_choice" &&
      (element.type === "dropdown" || element.type === "radiogroup")
  );

  const pages =
    firstChoiceQuestion && "choices" in firstChoiceQuestion
      ? firstChoiceQuestion.choices
      : [];

  const COUNTDOWN_SECONDS = 15;
  let countdownTimer: NodeJS.Timeout;
  let countdownRemaining = COUNTDOWN_SECONDS;

  function startCountdownWithDOMAccess() {
    countdownRemaining = COUNTDOWN_SECONDS;
    const nextBtn = document.querySelector<HTMLButtonElement>(
      ".sd-navigation__next-btn"
    );
    if (!nextBtn) {
      console.error("Next button not found");
      return;
    }

    nextBtn.disabled = true;
    nextBtn.value = `${countdownRemaining}s`;

    countdownTimer = setInterval(() => {
      countdownRemaining--;
      if (nextBtn) {
        if (countdownRemaining > 0) {
          nextBtn.value = `${countdownRemaining}s`;
        } else {
          clearInterval(countdownTimer);
          nextBtn.disabled = false;
          nextBtn.value = "Next";
        }
      }
    }, 1000);
  }

  useEffect(() => {
    // Define handlers
    const handleComplete = async (
      survey: SurveyModel,
      options: CompleteOptions
    ) => {
      if (isSubmitting) return;

      try {
        setIsSubmitting(true);
        options.showSaveInProgress();
        const enrichedData = { ...survey.data };
        const questions = survey.getAllQuestions();

        questions.forEach((question) => {
          const value = survey.data[question.name];
          if (value) {
            if (question.choices) {
              const choice = question.choices.find(
                (c: Choice) => c.value === value
              );
              if (choice) {
                enrichedData[question.name] = {
                  value: choice.value,
                  question_title: question.title,
                  answer_text: choice.text,
                };
              }
            } else {
              enrichedData[question.name] = {
                value,
                question_title: question.title,
                answer_text: value,
              };
            }
          }
        });

        const response = await fetch("/api/recruitment/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
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
          error instanceof Error
            ? error.message
            : "An unexpected error occurred";
        console.error("Failed to save survey results:", error);
        setError(errorMessage);
        options.showSaveError();
      } finally {
        setIsSubmitting(false);
      }
    };

    const handleUpload = async (_: any, options: UploadOptions) => {
      const formData = new FormData();
      options.files.forEach((file) => formData.append("file", file));

      try {
        const response = await fetch("/api/recruitment/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Upload failed");

        options.callback(
          options.files.map((file) => ({
            file,
            content: data["fileUrl"],
          }))
        );
      } catch (e) {
        console.error("Upload error: ", e);
        options.callback([], ["An error occurred during file upload."]);
      }
    };

    const handleDownload = async (_: any, options: DownloadOptions) => {
      try {
        const response = await fetch(options.content);
        if (!response.ok) throw new Error("Download failed");

        const blob = await response.blob();
        const file = new File([blob], options.fileValue.name, {
          type: options.fileValue.type,
        });

        const reader = new FileReader();
        reader.onload = (e) => {
          options.callback("success", (e.target?.result as string) || "");
        };
        reader.readAsDataURL(file);
      } catch (e) {
        console.error("Download error: ", e);
        options.callback("error");
      }
    };

    const handleRender = (sender: SurveyModel) => {
      try {
        const currentPageName = sender.currentPage?.name;
        if (!currentPageName) {
          console.warn('Current page name is undefined');
          return;
        }

        // Handle countdown timer
        const matchedPage = pages?.find((page) => {
          if (!page) return false;
          if (typeof page === "string") {
            return page.includes(currentPageName);
          }
          return "text" in page && page.text.includes(currentPageName);
        });

        if (matchedPage) {
          requestAnimationFrame(() => startCountdownWithDOMAccess());
        }
      } catch (error) {
        console.error("Error in handleRender:", error);
      }
    };

    const handleServerValidateQuestions = async (_: any, { data, errors, complete }: { data: Record<string, any>; errors: Record<string, string>; complete: () => void }) => {
      const email = data["email"];
      if(!email || errors["email"]){
        complete();
        return;
      }

      try {
        const response = await fetch("/api/recruitment/check-unique?email=" + email);

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Upload failed");

        if (!data.isUnique) {
          errors["email"] = "Email is already used";
        }
      } catch (e) {
        console.error("Validate error: ", e);
      } finally {
        complete();
        return;
      }
    };

    const handleElementRerendered = () => {
      // Handle special buttons
      const descElements = Array.from(document.getElementsByClassName("sd-description"));
      descElements.forEach((element) => {
        if (!(element instanceof HTMLElement)) return;

        const createCustomButton = (
          buttonText: string,
          url: string,
          className = "text-[#eb0028] underline"
        ) => {
          const button = document.createElement("button");
          Array.from(element.attributes).forEach((attr) => {
            button.setAttribute(attr.name, attr.value);
          });
          button.className = className;
          button.innerHTML = buttonText;
          button.onclick = () => window.open(url, "_blank");
          return button;
        };

        if (element.innerHTML.includes("pdf+button")) {
          const button = createCustomButton(
            "Click here to take the DOPE Personality Test | 点这里进行您的DOPE人格测试",
            "https://drive.google.com/file/d/1cAl2GKDqrCAJWbZkw63N8ZNEzsa6Prfg/view?usp=sharing"
          );
          element.parentNode?.replaceChild(button, element);
        } else if (element.innerHTML.includes("jd+button")) {
          const button = createCustomButton(
            "Click here to read job scope of all teams | 点这里阅读所有小组的职责范畴",
            "https://docs.google.com/file/d/1y2FFqjF7_62Vg_c_Z61Y9FVIlN2HYqCy/edit?filetype=msword"
          );
          element.parentNode?.replaceChild(button, element);
        }
      });

      // Handle character replacements
      const replaceCharInElements = (selector: string, from: string, to: string) => {
        const elements = Array.from(document.getElementsByClassName(selector));
        elements.forEach((element) => {
          if (element instanceof HTMLElement && element.innerHTML.includes(from)) {
            element.innerHTML = element.innerHTML.replace(from, to);
          }
          if (element instanceof HTMLInputElement && element.value.includes(from)) {
            element.value = element.value.replace(from, to);
            element.name = element.name.replace(from, to);
          }
        });
      };

      replaceCharInElements("sv-string-viewer", "\\", "|");
      replaceCharInElements("sd-item__control", "\\", "|");
    };

    // Register handlers
    surveyModel.onComplete.add(handleComplete);
    surveyModel.onUploadFiles.add(handleUpload);
    surveyModel.onDownloadFile.add(handleDownload);
    surveyModel.onAfterRenderPage.add(handleRender);
    surveyModel.onElementRerendered?.add(handleElementRerendered);
    surveyModel.onServerValidateQuestions.add(handleServerValidateQuestions);

    // Cleanup
    return () => {
      if (countdownTimer) clearInterval(countdownTimer);
      surveyModel.onComplete.remove(handleComplete);
      surveyModel.onUploadFiles.remove(handleUpload);
      surveyModel.onDownloadFile.remove(handleDownload);
      surveyModel.onAfterRenderPage.remove(handleRender);
      surveyModel.onElementRerendered?.remove(handleElementRerendered);
      surveyModel.onServerValidateQuestions.remove(handleServerValidateQuestions);
    };
  }, [isSubmitting, pages, surveyModel]);

  return !error ? (
    <Survey model={surveyModel} />
  ) : (
    <div className="w-full text-center space-y-2 py-3 bg-[#1c1c1c]">
      <p className="font-bold text-white text-2xl">{error}</p>
      <button
        onClick={() => setError(null)}
        className="text-sm bg-white p-2 rounded"
      >
        Dismiss
      </button>
    </div>
  );
}

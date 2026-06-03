"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Model, SurveyModel } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/survey-core.css";
import "../app/survey_theme.css";

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

interface Expiry {
    date?: string;
    message?: string;
}

export default function SurveyComponent() {
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [surveyModel, setSurveyModel] = useState<SurveyModel | null>(null);
    const [pages, setPages] = useState<(Choice | string)[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [expiry, setExpiry] = useState<Expiry | null>(null);
    const [allowDuplicateEmails, setAllowDuplicateEmails] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        const loadSurveyData = async () => {
            try {
                const currentPath = window.location.pathname.replace(/^\/+/, "");
                if (!currentPath) {
                    if (isMounted) {
                        setIsLoading(false);
                    }
                    return;
                }
                const res = await fetch(`/api/load?slug=${encodeURIComponent(currentPath)}`);
                if (!res.ok) {
                    const errData = await res.json();
                    throw new Error(errData.error || "Failed to load form configuration");
                }
                const jsonResponse = await res.json();
                const { data } = jsonResponse;

                if (isMounted) {
                    setExpiry(jsonResponse.expiry || data?.expiry || null);
                    setAllowDuplicateEmails(jsonResponse.allowDuplicateEmails ?? data?.allowDuplicateEmails ?? true);
                    const model = new Model(data);
                    model.applyTheme({
                        themeName: "tedxRecruitFormTheme",
                        colorPalette: "dark",
                        isPanelless: false,
                    });
                    setSurveyModel(model);

                    const firstChoiceQuestion = data.pages?.[0]?.elements?.find(
                        (element: any) =>
                            element.name === "first_choice" &&
                            (element.type === "dropdown" || element.type === "radiogroup")
                    );

                    setPages(
                        firstChoiceQuestion && "choices" in firstChoiceQuestion
                            ? firstChoiceQuestion.choices
                            : []
                    );
                }
            } catch (err) {
                console.error("Error loading form data:", err);
                if (isMounted) {
                    setError(err instanceof Error ? err.message : "Error loading form");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        loadSurveyData();

        return () => {
            isMounted = false;
        };
    }, []);

    const countdownTimerRef = useRef<NodeJS.Timeout | null>(null);

    const startCountdownWithDOMAccess = useCallback((seconds: number) => {
        let countdownRemaining = seconds;
        const nextBtn = document.querySelector<HTMLButtonElement>(
            ".sd-navigation__next-btn"
        );
        if (!nextBtn) {
            console.error("Next button not found");
            return;
        }

        nextBtn.disabled = true;
        nextBtn.value = `${countdownRemaining}s`;

        countdownTimerRef.current = setInterval(() => {
            countdownRemaining--;
            if (nextBtn) {
                if (countdownRemaining > 0) {
                    nextBtn.value = `${countdownRemaining}s`;
                } else {
                    if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
                    nextBtn.disabled = false;
                    nextBtn.value = "Next";
                }
            }
        }, 1000);
    }, []);

    useEffect(() => {
        if (!surveyModel) return;

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

                const currentPath = window.location.pathname.replace(/^\/+/, "");
                if (currentPath) {
                    enrichedData["slug"] = currentPath;
                }

                const response = await fetch("/api/submit", {
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

            const currentPath = window.location.pathname.replace(/^\/+/, "");
            if (currentPath) {
                formData.append("slug", currentPath);
            }

            try {
                const response = await fetch("/api/upload", {
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

                // Check for readTimeEnforcement directly in the SurveyJS page JSON definition
                const readTimeSeconds = sender.currentPage?.origialJson?.readTimeEnforcement || sender.currentPage?.jsonObj?.readTimeEnforcement;

                if (readTimeSeconds && typeof readTimeSeconds === 'number') {
                    requestAnimationFrame(() => startCountdownWithDOMAccess(readTimeSeconds));
                }
            } catch (error) {
                console.error("Error in handleRender:", error);
            }
        };

        const handleServerValidateQuestions = async (_: any, { data, errors, complete }: { data: Record<string, any>; errors: Record<string, string>; complete: () => void }) => {
            if (allowDuplicateEmails) {
                complete();
                return;
            }

            const email = data["email"];
            if (!email || errors["email"]) {
                complete();
                return;
            }

            try {
                const currentPath = window.location.pathname.replace(/^\/+/, "");
                const response = await fetch(`/api/validate?email=${encodeURIComponent(email)}&slug=${encodeURIComponent(currentPath)}`);

                const data = await response.json();
                if (!response.ok) throw new Error(data.message || "Upload failed");

                if (!data.isUnique) {
                    errors["email"] = "You have previously submitted an application using this email, please use another one.";
                }
            } catch (e) {
                console.error("Validate error: ", e);
            } finally {
                complete();
                return;
            }
        };

        const handleTextMarkdown = (_: any, options: { text: string; html?: string; }) => {
            // 1. Handle actual Markdown links: [Link Text](https://url) format
            const markdownRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
            let modifiedText = options.text;

            if (modifiedText.match(markdownRegex)) {
                modifiedText = modifiedText.replace(markdownRegex, (match, text, url) => {
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#eb0028] underline whitespace-normal text-left break-words max-w-full cursor-pointer inline-block mt-1 hover:text-red-700">${text}</a>`;
                });
            }

            // 2. Handle raw HTML links: <a href="url">Text</a> format
            const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href=["'](.*?)["'][^>]*>(.*?)<\/a>/gi;
            if (modifiedText.match(htmlLinkRegex)) {
                modifiedText = modifiedText.replace(htmlLinkRegex, (match, url, text) => {
                    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-[#eb0028] underline whitespace-normal text-left break-words max-w-full cursor-pointer inline-block mt-1 hover:text-red-700">${text}</a>`;
                });
            }

            if (modifiedText !== options.text) {
                options.html = modifiedText;
            }
        };

        const handleElementRerendered = () => {
            requestAnimationFrame(() => {
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

                replaceCharInElements("sv-string-viewer", "\\\\", "|");
                replaceCharInElements("sd-item__control", "\\\\", "|");
            });
        };

        // Register handlers
        surveyModel.onComplete.add(handleComplete);
        surveyModel.onUploadFiles.add(handleUpload);
        surveyModel.onDownloadFile.add(handleDownload);
        surveyModel.onAfterRenderPage.add(handleRender);
        surveyModel.onElementRerendered?.add(handleElementRerendered);
        surveyModel.onServerValidateQuestions.add(handleServerValidateQuestions);
        surveyModel.onTextMarkdown.add(handleTextMarkdown);

        // Initial execution
        handleElementRerendered();

        // Cleanup
        return () => {
            if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
            surveyModel.onComplete.remove(handleComplete);
            surveyModel.onUploadFiles.remove(handleUpload);
            surveyModel.onDownloadFile.remove(handleDownload);
            surveyModel.onAfterRenderPage.remove(handleRender);
            surveyModel.onElementRerendered?.remove(handleElementRerendered);
            surveyModel.onServerValidateQuestions.remove(handleServerValidateQuestions);
            surveyModel.onTextMarkdown.remove(handleTextMarkdown);
        };
    }, [isSubmitting, pages, surveyModel, allowDuplicateEmails, startCountdownWithDOMAccess]);

    if (isLoading) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 bg-[#1c1c1c]">
                <div className="w-12 h-12 border-4 border-[#eb0028] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-white text-lg font-medium animate-pulse">Loading form...</p>
            </div>
        );
    }

    if (!surveyModel && !error) {
        return (
            <div className="w-full flex flex-col items-center justify-center py-20 bg-[#1c1c1c] text-white text-center px-4">
                <p className="text-2xl font-bold mb-2">TEDxPetalingStreet</p>
                <p className="text-gray-400">Please navigate to a specific form URL to get started.</p>
            </div>
        );
    }

    if (expiry && expiry.date && new Date() > new Date(expiry.date)) {
        return (
            <div
                className="w-full flex flex-col items-center justify-center py-20 bg-[#1c1c1c] text-white p-4"
                dangerouslySetInnerHTML={{ __html: expiry.message || "This form has expired." }}
            />
        );
    }

    return !error && surveyModel ? (
        <Survey model={surveyModel} />
    ) : (
        <div className="w-full text-center space-y-2 py-3 bg-[#1c1c1c]">
            <p className="font-bold text-white text-2xl">{error}</p>
            <button
                onClick={() => setError(null)}
                className="text-sm bg-white p-2 rounded text-black"
            >
                Dismiss
            </button>
        </div>
    );
}

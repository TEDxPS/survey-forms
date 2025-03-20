'use client'

import { Model } from 'survey-core'
import { Survey } from 'survey-react-ui'
import 'survey-core/survey-core.css'
import { json } from '../../data/survey_json.js'

export default function SurveyComponent() {
  const model = new Model(json);
  model.applyTheme({
    "cssVariables": {
      "--sjs-general-backcolor": "rgba(38, 38, 38, 1)",
      "--sjs-general-backcolor-dark": "rgba(48, 48, 48, 1)",
      "--sjs-general-backcolor-dim": "rgba(28, 28, 28, 1)",
      "--sjs-general-backcolor-dim-light": "rgba(48, 48, 48, 1)",
      "--sjs-general-backcolor-dim-dark": "rgba(58, 58, 58, 1)",
      "--sjs-general-forecolor": "rgba(255, 255, 255, 0.78)",
      "--sjs-general-forecolor-light": "rgba(255, 255, 255, 0.42)",
      "--sjs-general-dim-forecolor": "rgba(255, 255, 255, 0.79)",
      "--sjs-general-dim-forecolor-light": "rgba(255, 255, 255, 0.45)",
      "--sjs-primary-backcolor": "#eb0028",
      "--sjs-primary-backcolor-dark": "rgba(220, 0, 37, 1)",
      "--sjs-primary-backcolor-light": "rgba(235, 0, 40, 0.1)",
      "--sjs-primary-forecolor": "rgba(32, 32, 32, 1)",
      "--sjs-primary-forecolor-light": "rgba(32, 32, 32, 0.25)",
      "--sjs-base-unit": "8px",
      "--sjs-corner-radius": "4px",
      "--sjs-secondary-backcolor": "rgba(255, 152, 20, 1)",
      "--sjs-secondary-backcolor-light": "rgba(255, 152, 20, 0.1)",
      "--sjs-secondary-backcolor-semi-light": "rgba(255, 152, 20, 0.25)",
      "--sjs-secondary-forecolor": "rgba(48, 48, 48, 1)",
      "--sjs-secondary-forecolor-light": "rgba(48, 48, 48, 0.25)",
      "--sjs-shadow-small": "0px 2px 0px 2px rgba(64, 64, 64, 1),0px 0px 0px 2px rgba(64, 64, 64, 1)",
      "--sjs-shadow-small-reset": "0px 0px 0px 0px rgba(64, 64, 64, 1),0px 0px 0px 0px rgba(64, 64, 64, 1)",
      "--sjs-shadow-medium": "0px 0px 0px 2px rgba(64, 64, 64, 1),0px 8px 0px 2px rgba(64, 64, 64, 1)",
      "--sjs-shadow-large": "0px 0px 0px 0px rgba(0, 0, 0, 0.1)",
      "--sjs-shadow-inner": "0px 0px 0px 2px rgba(64, 64, 64, 1),0px 2px 0px 2px rgba(64, 64, 64, 1)",
      "--sjs-shadow-inner-reset": "0px 0px 0px 0px rgba(64, 64, 64, 1),0px 0px 0px 0px rgba(64, 64, 64, 1)",
      "--sjs-border-light": "rgba(255, 255, 255, 0.12)",
      "--sjs-border-default": "rgba(255, 255, 255, 0.12)",
      "--sjs-border-inside": "rgba(255, 255, 255, 0.08)",
      "--sjs-special-red": "rgba(254, 76, 108, 1)",
      "--sjs-special-red-light": "rgba(254, 76, 108, 0.1)",
      "--sjs-special-red-forecolor": "rgba(48, 48, 48, 1)",
      "--sjs-special-green": "rgba(36, 197, 164, 1)",
      "--sjs-special-green-light": "rgba(36, 197, 164, 0.1)",
      "--sjs-special-green-forecolor": "rgba(48, 48, 48, 1)",
      "--sjs-special-blue": "rgba(91, 151, 242, 1)",
      "--sjs-special-blue-light": "rgba(91, 151, 242, 0.1)",
      "--sjs-special-blue-forecolor": "rgba(48, 48, 48, 1)",
      "--sjs-special-yellow": "rgba(255, 152, 20, 1)",
      "--sjs-special-yellow-light": "rgba(255, 152, 20, 0.1)",
      "--sjs-special-yellow-forecolor": "rgba(48, 48, 48, 1)",
      "--sjs-article-font-xx-large-textDecoration": "none",
      "--sjs-article-font-xx-large-fontWeight": "700",
      "--sjs-article-font-xx-large-fontStyle": "normal",
      "--sjs-article-font-xx-large-fontStretch": "normal",
      "--sjs-article-font-xx-large-letterSpacing": "0",
      "--sjs-article-font-xx-large-lineHeight": "64px",
      "--sjs-article-font-xx-large-paragraphIndent": "0px",
      "--sjs-article-font-xx-large-textCase": "none",
      "--sjs-article-font-x-large-textDecoration": "none",
      "--sjs-article-font-x-large-fontWeight": "700",
      "--sjs-article-font-x-large-fontStyle": "normal",
      "--sjs-article-font-x-large-fontStretch": "normal",
      "--sjs-article-font-x-large-letterSpacing": "0",
      "--sjs-article-font-x-large-lineHeight": "56px",
      "--sjs-article-font-x-large-paragraphIndent": "0px",
      "--sjs-article-font-x-large-textCase": "none",
      "--sjs-article-font-large-textDecoration": "none",
      "--sjs-article-font-large-fontWeight": "700",
      "--sjs-article-font-large-fontStyle": "normal",
      "--sjs-article-font-large-fontStretch": "normal",
      "--sjs-article-font-large-letterSpacing": "0",
      "--sjs-article-font-large-lineHeight": "40px",
      "--sjs-article-font-large-paragraphIndent": "0px",
      "--sjs-article-font-large-textCase": "none",
      "--sjs-article-font-medium-textDecoration": "none",
      "--sjs-article-font-medium-fontWeight": "700",
      "--sjs-article-font-medium-fontStyle": "normal",
      "--sjs-article-font-medium-fontStretch": "normal",
      "--sjs-article-font-medium-letterSpacing": "0",
      "--sjs-article-font-medium-lineHeight": "32px",
      "--sjs-article-font-medium-paragraphIndent": "0px",
      "--sjs-article-font-medium-textCase": "none",
      "--sjs-article-font-default-textDecoration": "none",
      "--sjs-article-font-default-fontWeight": "400",
      "--sjs-article-font-default-fontStyle": "normal",
      "--sjs-article-font-default-fontStretch": "normal",
      "--sjs-article-font-default-letterSpacing": "0",
      "--sjs-article-font-default-lineHeight": "28px",
      "--sjs-article-font-default-paragraphIndent": "0px",
      "--sjs-article-font-default-textCase": "none"
    },
    themeName: "tedxRecruitFormTheme",
    colorPalette: "dark",
    isPanelless: false,
  });

  model.onComplete.add(async (survey, options) => {
    options.showSaveInProgress();
    console.log(survey.data);

    try {
      await fetch("/api/recruitment/submit", {
        method: "POST",
        body: JSON.stringify(survey.data),
      });


      options.showSaveSuccess();
    } catch (error) {
      console.error('Failed to save survey results:', error);
      options.showSaveError();
    }
  });
  return (
    // <GoogleOAuthProvider clientId="">
    /* <GoogleSignIn onSuccess={handleGoogleSuccess} /> */
    <Survey model={model} />
    // </GoogleOAuthProvider> 
  );
}

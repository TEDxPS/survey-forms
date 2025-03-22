import { editorial } from "./team_questions/en/editorial_json.js";
import { visual } from "./team_questions/en/visual_json.js";
import { socialMedia } from "./team_questions/en/social_media_json.js";
import { videoPhoto } from "./team_questions/en/video_photo_json.js";
import { infoManagement } from "./team_questions/en/info_management_json.js";
import { partnership } from "./team_questions/en/partnership_json.js";
import { foodBeverage } from "./team_questions/en/food_beverage_json.js";
import { ticketing } from "./team_questions/en/ticketing_json.js";
import { publicRelations } from "./team_questions/en/public_relations_json.js";
import { experience } from "./team_questions/en/experience_json.js";
import { speakerCuration } from "./team_questions/en/speaker_curation_json.js";
import { stageManagement } from "./team_questions/en/stage_management_json.js";
import { production } from "./team_questions/en/production_json.js";

export const json = {
  title: "TEDxPS Volunteer Application Form",
  showQuestionNumbers: "onPage",
  pages: [
    {
      name: "Personal Information",
      elements: [
        {
          type: "text",
          inputType: "email",
          name: "email",
          title: "Email",
          isRequired: true,
        },
        {
          type: "text",
          name: "name_ic",
          title: "Name as per IC",
          isRequired: true
        },
        {
          type: "text",
          name: "nickname",
          title: "Nickname",
        },
        {
          type: "radiogroup",
          name: "gender",
          title: "Gender",
          isRequired: true,
          choices: ["Female", "Male", "Other"],
        },
        {
          type: "dropdown",
          name: "age_group",
          title: "Age Group",
          isRequired: true,
          choices: [
            "Under 18",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65 or older",
          ],
        },
        {
          type: "text",
          inputType: "tel",
          name: "contact",
          title: "Contact Number",
          isRequired: true,
          placeHolder: "e.g. 60123456789",
          validators: [
            {
              type: "regex",
              text: "Should be phone format",
              regex: "\\d{10,11}"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "language_preference",
          title: "Language Preference",
          isRequired: true,
          choices: [
            "I would prefer to answer in Mandarin",
            "I would prefer an English response",
          ],
        },
        {
          type: "text",
          name: "education",
          title: "Highest Education Background",
          isRequired: true,
          placeHolder:
            "e.g. Bachelor of Arts major in communications and media studies",
        },
        {
          type: "dropdown",
          name: "first_choice",
          title: "[FIRST CHOICE] In which group do you wish to join?",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "First choice and second choice cannot be the same",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            "Editorial",
            "Visual - Graphic/ Animation Design",
            "Social Media Team",
            "Video & Photo Team",
            "Information Management",
            "Partnership - Monetary & In-Kind",
            "Food & Beverage",
            "Ticketing",
            "Public Relations",
            "Experience - Pop Up/ Merchandize/ Adventure",
            "Speaker Curation",
            "Stage Management",
            "Production",
          ],
        },
        {
          type: "dropdown",
          name: "second_choice",
          title: "[SECOND CHOICE] In which group do you wish to join?",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "First choice and second choice cannot be the same",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            "Editorial",
            "Visual - Graphic/ Animation Design",
            "Social Media Team",
            "Video & Photo Team",
            "Information Management",
            "Partnership - Monetary & In-Kind",
            "Food & Beverage",
            "Ticketing",
            "Public Relations",
            "Experience - Pop Up/ Merchandize/ Adventure",
            "Speaker Curation",
            "Stage Management",
            "Production",
          ],
        },
        {
          type: "text",
          name: "dope_result",
          title: "DOPE Result",
          description: "Test your DOPE result: https://richardstep.com/dope-personality-type-quiz/dope-bird-4-personality-types-test-questions-online-version/",
          isRequired: true,
          validators: [
            {
              type: "regex",
              text: "The DOPE result should be only one letter, either D, O, P or E",
              regex: "^[DOPEdope]$"
            }
          ],
        },
      ],
    },
    editorial,
    visual,
    socialMedia,
    videoPhoto,
    infoManagement,
    partnership,
    foodBeverage,
    ticketing,
    publicRelations,
    experience,
    speakerCuration,
    stageManagement,
    production,
    {
      name: "Interview & Availability",
      elements: [
        {
          type: "checkbox",
          name: "interview_slots",
          title: "Preferred interview date and time",
          isRequired: true,
          choices: [
            "23/3 Slot A - 11am",
            "23/3 Slot B - 3pm",
            "23/3 Slot C - 5pm",
            "24/3 Slot A - 11am",
            "24/3 Slot B - 3pm",
            "24/3 Slot C - 5pm",
            "Unable to attend any of the above slots, arrange online interview",
          ],
        },
        {
          type: "checkbox",
          name: "major_events",
          title: "Availability for major events",
          isRequired: true,
          choices: [
            "24 May 2025 | Orientation Day",
            "27 Sep 2025 | Briefing Day",
            "09 Oct 2025 | Rehearsal Day",
            "10 Oct 2025 | Rehearsal Day",
            "11 Oct 2025 | Event Day",
            "18 Oct 2025 | Appreciation Dinner",
          ],
        },
      ],
    },
  ],
  triggers: [
    {
      type: "skip",
      expression: "{first_choice} = 'Editorial'",
      gotoName: "Writing & Public Relations",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Visual - Graphic/ Animation Design'",
      gotoName: "Design Tools",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Social Media Team'",
      gotoName: "Social Media & Photography",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Video & Photo Team'",
      gotoName: "Social Media & Photography",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Information Management'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Partnership - Monetary & In-Kind'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Food & Beverage'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Ticketing'",
      gotoName: "Ticketing & Customer Service",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Public Relations'",
      gotoName: "Writing & Public Relations",
    },
    {
      type: "skip",
      expression:
        "{first_choice} = 'Experience - Pop Up/ Merchandize/ Adventure'",
      gotoName: "Additional Experience",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Speaker Curation'",
      gotoName: "Speaker Curation",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Stage Management'",
      gotoName: "Interview & Availability",
    },
    {
      type: "skip",
      expression: "{first_choice} = 'Production'",
      gotoName: "Interview & Availability",
    },
  ],
};

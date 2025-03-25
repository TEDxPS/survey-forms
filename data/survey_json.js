import { editorial } from "./team_questions/editorial_json.js";
import { visual } from "./team_questions/visual_json.js";
import { socialMedia } from "./team_questions/social_media_json.js";
import { videoPhoto } from "./team_questions/video_photo_json.js";
import { infoManagement } from "./team_questions/info_management_json.js";
import { partnership } from "./team_questions/partnership_json.js";
import { foodBeverage } from "./team_questions/food_beverage_json.js";
import { ticketing } from "./team_questions/ticketing_json.js";
import { publicRelations } from "./team_questions/public_relations_json.js";
import { experience } from "./team_questions/experience_json.js";
import { speakerCuration } from "./team_questions/speaker_curation_json.js";
import { stageManagement } from "./team_questions/stage_management_json.js";
import { production } from "./team_questions/production_json.js";

export const json = {
  title: "TEDxPS Volunteer Application Form",
  showQuestionNumbers: "onPage",
  showPreviewBeforeComplete: true,
  previewMode: "answeredQuestions",
  pages: [
    {
      name: "Personal Information | 个人信息",
      elements: [
        {
          type: "text",
          inputType: "email",
          name: "email",
          title: "Email | 电子邮箱",
          isRequired: true,
        },
        {
          type: "text",
          name: "name_ic",
          title: "Name as per IC | 姓名",
          isRequired: true
        },
        {
          type: "text",
          name: "nickname",
          title: "Nickname | 小名",
        },
        {
          type: "radiogroup",
          name: "gender",
          title: "Gender | 性别",
          isRequired: true,
          choices: ["Female ｜ 女", "Male ｜ 男", "Other ｜ 其他"],
        },
        {
          type: "dropdown",
          name: "age_group",
          title: "Age Group | 年龄层",
          isRequired: true,
          choices: [
            "Under 18 以下",
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
          title: "Contact Number | 联络号码",
          isRequired: true,
          placeHolder: "e.g. 60123456789",
          validators: [
            {
              type: "regex",
              text: "Please key in the correct phone format | 请输入正确的电话号码格式",
              regex: "^60\\d{9,10}$"
            }
          ]
        },
        {
          type: "panel",
          name: "proficiency_panel",
          elements: [
            {
              type: "html",
              name: "proficiency_desc",
              html: "<div style=\"font-weight:600;\">Chinese/Mandarin Proficiency |  中文阅读/书写水平 </div>\n<ul style=\"list-style-type:disc;margin-left:20px;\">\n<li>We recommend answering all questions in Mandarin. However, an English version is available.\n</li>\n<li>尽管我们希望您用中文回答，但如果您更擅长用英文表达自己，欢迎您使用英文版表格回答！</li>\n</ul>"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "language_preference",
          title: "Can you read and write in Mandarin? | 请问您可以阅读及书写中文吗？",
          isRequired: true,
          choices: [
            {
              value: "mandarin",
              text: "I would prefer answer in Mandarin | 我可以理解及使用中文回答"
            },
            {
              value: "english",
              text: "I would prefer an English respond | 我想使用英文版表格进行回答"
            }
          ],
        },
        {
          type: "text",
          name: "education",
          title: "Highest Education Background | 最高学历",
          isRequired: true,
          placeHolder:
            "e.g. Bachelor of Arts major in communications and media studies",
        },
        {
          type: "text",
          name: "industry",
          title: "Current Working Industry/Study | 目前所在行业/专业",
          description:
            "In what industry are you currently involving. If you are a student, please also mention what course are you currently studying.",
          isRequired: true,
        },
        {
          type: "text",
          name: "attended_tedxps",
          title: "Have you attended any TEDxPetalingStreet events before? | 您是否曾参加过TEDxPetalingStreet活动？",
          description: "If yes, please share with us which ones you attended.",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "preferred_tedxps",
          title: "Which one below can better describe your preference of joining us as volunteer in TEDxPetalingStreet ? | 您希望加入TEDxPetalingStreet的主要原因是什么？",
          isRequired: true,
          choices: [
            { value: "experienced", text: "I want to join a role that is more relevant to what I studied/ I am working | 我希望加入的团队与我所学专业/工作领域相关" },
            { value: "new", text: "I want to try something new / open to any opportunity | 我希望尝试新的团队/机会" },
          ]
        },
        {
          type: "text",
          name: "other_experience",
          title: "Any volunteering experience other than TEDx? | 您是否曾担任过其他志愿者角色？",
          description: "Please describe your role if you have any.",
          isRequired: true,
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
            { value: "Editorial", text: "Editorial | 文案组" },
            { value: "Visual", text: "Visual - Graphic/ Animation Design | 视觉 - 平面/动画设计" },
            { value: "Social Media Team", text: "Social Media Team | 社交媒体团队" },
            { value: "Video & Photo Team", text: "Video & Photo Team | 视频与摄影团队" },
            { value: "Information Management", text: "Information Management | 信息管理" },
            { value: "Partnership", text: "Partnership - Monetary & In-Kind | 合作伙伴 - 资金与实物" },
            { value: "Food & Beverage", text: "Food & Beverage | 餐饮" },
            { value: "Ticketing", text: "Ticketing | 票务" },
            { value: "Public Relations", text: "Public Relations | 公共关系" },
            { value: "Experience", text: "Experience - Pop Up/ Merchandize/ Adventure | 体验 - 快闪/商品/探险" },
            { value: "Speaker Curation", text: "Speaker Curation | 讲者策划" },
            { value: "Stage Management", text: "Stage Management | 舞台管理" },
            { value: "Production", text: "Production | 制作" },
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
            { value: "Editorial", text: "Editorial | 文案组" },
            { value: "Visual", text: "Visual - Graphic/ Animation Design | 视觉 - 平面/动画设计" },
            { value: "Social Media Team", text: "Social Media Team | 社交媒体团队" },
            { value: "Video & Photo Team", text: "Video & Photo Team | 视频与摄影团队" },
            { value: "Information Management", text: "Information Management | 信息管理" },
            { value: "Partnership", text: "Partnership - Monetary & In-Kind | 合作伙伴 - 资金与实物" },
            { value: "Food & Beverage", text: "Food & Beverage | 餐饮" },
            { value: "Ticketing", text: "Ticketing | 票务" },
            { value: "Public Relations", text: "Public Relations | 公共关系" },
            { value: "Experience", text: "Experience - Pop Up/ Merchandize/ Adventure | 体验 - 快闪/商品/探险" },
            { value: "Speaker Curation", text: "Speaker Curation | 讲者策划" },
            { value: "Stage Management", text: "Stage Management | 舞台管理" },
            { value: "Production", text: "Production | 制作" },
          ],
        },
        {
          type: "radiogroup",
          name: "dope_result",
          title: "DOPE Result",
          description: "pdf+button",
          isRequired: true,
          choices: [
            "Peacock",
            "Dove",
            "Owl",
            "Eagle",
          ]
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
  ],
};

import { editorial } from "./team_questions/editorial_json.js";
import { floorAndHall } from "./team_questions/floor_and_hall.js";
import { visual } from "./team_questions/visual_json.js";
import { socialMedia } from "./team_questions/social_media_json.js";
import { videoPhoto } from "./team_questions/video_photo_json.js";
import { infoTech } from "./team_questions/info_tech_json.js";
import { partnership } from "./team_questions/partnership_json.js";
import { foodBeverage } from "./team_questions/food_beverage_json.js";
import { ticketing } from "./team_questions/ticketing_json.js";
import { publicRelations } from "./team_questions/public_relations_json.js";
import { experience } from "./team_questions/experience_json.js";
import { speakerCuration } from "./team_questions/speaker_curation_json.js";
import { stageManagement } from "./team_questions/stage_management_json.js";
import { production } from "./team_questions/production_json.js";
import { logistic } from "./team_questions/logistic_json.js"; 
import { volunteer } from "./team_questions/volunteer_json.js";
import { interviewTimeA } from "./interview_time_group_a_json.js";
import { interviewTimeB } from "./interview_time_group_b_json.js";
import { wrappingUp } from "./wrapping_up_questions.js";
import { knowMoreQuestions } from "./know_more_questions.js";

export const json = {
  title: "TEDxPetalingStreet Volunteer Application | TEDxPetalingStreet 志工申请表",
  showQuestionNumbers: "onPage",
  showPreviewBeforeComplete: true,
  previewMode: "answeredQuestions",
  completedHtml: `<div class="w-[90%] md:w-[65%] mx-auto text-center pb-8"><h3>This form has come to an end! Thank you for your time. </h3>
    <p>By completing the registration form, you acknowledge and consent to the collection, usage, and/or disclosure of your personal information, as necessary for your participation in our volunteer program. </p>
    <p>Only candidates who have been shortlisted will be notified.  Best of luck!</p>
    <br />
    <h3>恭喜您完成了报名！我们诚心感谢您的时间还有用心!   </h3>
    <ul class="list-none p-0">
      <li>提交此表格表示您得知并同意，在参与我们的志工计划所必要的情况下，您的个资将被收集、使用和/或披露。</li>
      <li>只有入围者会收到线下面试通知！ 祝您好运！</li>
    </ul></div>
    `,
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
        // {
        //   type: "panel",
        //   name: "proficiency_panel",
        //   elements: [
        //     {
        //       type: "html",
        //       name: "proficiency_desc",
        //       html: "<div style=\"font-weight:600;\">Chinese/Mandarin Proficiency |  中文阅读/书写水平 </div>\n<ul style=\"list-style-type:disc;margin-left:20px;\">\n<li>We recommend answering all questions in Mandarin. However, an English version is available.\n</li>\n<li>尽管我们希望您用中文回答，但如果您更擅长用英文表达自己，欢迎您使用英文版表格回答！</li>\n</ul>"
        //     }
        //   ]
        // },
        // {
        //   type: "radiogroup",
        //   name: "language_preference",
        //   title: "Can you read and write in Mandarin? | 请问您可以阅读及书写中文吗？",
        //   isRequired: true,
        //   choices: [
        //     {
        //       value: "mandarin",
        //       text: "I would prefer answer in Mandarin | 我可以理解及使用中文回答"
        //     },
        //     {
        //       value: "english",
        //       text: "I would prefer an English respond | 我想使用英文版表格进行回答"
        //     }
        //   ],
        // },
        {
          type: "panel",
          name: "career_panel",
          elements: [
            {
              type: "html",
              name: "career_desc",
              html: "<div style=\"font-weight:600;\">Experience & Expertise |  专业与经验 </div>\n<ul style=\"list-style-type:disc;margin-left:20px;\">\n<li>Help us to understand what are you good at or enjoy doing.\n</li>\n<li>请让我们了解您的经验与所在的专业领域。</li>\n</ul>"
            }
          ]
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
          title: "Current Working Industry/Study | 目前所在的工作/求学领域",
          description:
            "In what industry are you currently involving. If you are a student, please also mention what course are you currently studying. | 您目前从事着什么行业。 或目前就读的科系。",
          isRequired: true,
        },
        {
          type: "text",
          name: "attended_tedxps",
          title: "Have you attended any TEDxPetalingStreet events before? | 您是否参与过TEDxPetalingStreet年会呢？",
          description: "If yes, please share with us which ones you attended. | 如有，请让我们知道您曾经参与过哪一届的年会。",
          isRequired: true,
        },
        {
          type: "text",
          name: "other_experience",
          title: "Any volunteering experience other than TEDx? | 请问您是否有成为活动志工的经验？",
          description: "Please describe your role if you have any. | 如有，欢迎分享你在活动里的角色与经验。",
          isRequired: true,
        },
        {
          type: "dropdown",
          name: "preferred_tedxps",
          title: "Which one below can better describe your preference of joining us as volunteer in TEDxPetalingStreet ? | 您希望加入TEDxPetalingStreet的主要原因是什么？",
          isRequired: true,
          choices: [
            { value: "experienced", text: "I want to join a role that is more relevant to what I studied/ I am working | 我想要参与和我的【学业】/【工作】领域有关系的组别为志工" },
            { value: "new", text: "I want to try something new / open to any opportunity | 我对我的组别分配保持开放，愿意尝试我没有经验的组别" },
          ]
        },
        {
          type: "dropdown",
          name: "first_choice",
          title: "[FIRST CHOICE] In which group do you wish to join? | 【第一选择】 想要加入的志工组别",
          description: "jd+button",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "First choice and second choice cannot be the same | 第一选择与第二选择不能相同",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            { value: "Logistic", text: "物流 Logistic" },
            { value: "Editorial", text: "文案 Editorial" },
            { value: "Social Media", text: "社交媒体 Social Media Team" },
            { value: "Visual", text: "主视觉 - 平面/ 动画设计 Visual - Graphic/ Animation Design" },
            { value: "Information Technology", text: "资讯科技 Information Technology" },
            { value: "Video & Photo", text: "摄影 & 影片摄录 Video & Photo" },
            { value: "Speaker Curation", text: "讲者策划 Speaker Curation" },
            { value: "Stage Management", text: "后台管理 Stage Management" },
            { value: "Production", text: "导播制作 Production" },
            { value: "Ticketing", text: "票务 Ticketing" },
            { value: "Public Relations", text: "公共关系 Public Relations" },
            { value: "Partnership", text: "合作伙伴 - 金钱与商品 Partnership - Monetary & In-Kind" },
            { value: "Food & Beverage", text: "餐饮 Food & Beverage" },
            { value: "Experience", text: "体验 - 参展单位/ 周边商品/ 㐀势活动 Experience - Pop Up/ Merchandize/ Adventure/" },
            { value: "Volunteer Management", text: "志工管理 Volunteer Management" },
            { value: "Hall & Floor", text: "外场 & 内场管理 Hall & Floor Management" },
          ],
        },
        {
          type: "dropdown",
          name: "second_choice",
          title: "[SECOND CHOICE] In which group do you wish to join? | 【第二选择】 想要加入的志工组别",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "First choice and second choice cannot be the same | 第一选择与第二选择不能相同",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            { value: "Logistic", text: "物流 Logistic" },
            { value: "Editorial", text: "文案 Editorial | 文案组" },
            { value: "Social Media", text: "社交媒体 Social Media" },
            { value: "Visual", text: "主视觉 - 平面/ 动画设计 Visual - Graphic/ Animation Design" },
            { value: "Information Technology", text: "资讯科技 Information Technology" },
            { value: "Video & Photo", text: "摄影 & 影片摄录 Video & Photo" },
            { value: "Speaker Curation", text: "讲者策划 Speaker Curation" },
            { value: "Stage Management", text: "后台管理 Stage Management" },
            { value: "Production", text: "导播制作 Production" },
            { value: "Ticketing", text: "票务 Ticketing" },
            { value: "Public Relations", text: "公共关系 Public Relations" },
            { value: "Partnership", text: " 合作伙伴 - 金钱与商品 Partnership - Monetary & In-Kind" },
            { value: "Food & Beverage", text: "餐饮 Food & Beverage" },
            { value: "Experience", text: "体验 - 参展单位/ 周边商品/ 㐀势活动 Experience - Pop Up/ Merchandize/ Adventure/" },
            { value: "Volunteer Management", text: "志工管理 Volunteer Management" },
            { value: "Hall & Floor", text: "外场 & 内场管理 Hall & Floor Management" },
          ],
        }
      ],
    },
    floorAndHall,
    editorial,
    visual,
    volunteer,
    socialMedia,
    videoPhoto,
    infoTech,
    partnership,
    foodBeverage,
    ticketing,
    publicRelations,
    experience,
    speakerCuration,
    stageManagement,
    production,
    logistic,
    interviewTimeA,
    interviewTimeB,
    wrappingUp,
    knowMoreQuestions,
  ],
};

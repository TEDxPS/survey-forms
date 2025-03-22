import { editorial } from "./team_questions/cn/editorial_json.js";
import { visual } from "./team_questions/cn/visual_json.js";
import { socialMedia } from "./team_questions/cn/social_media_json.js";
import { videoPhoto } from "./team_questions/cn/video_photo_json.js";
import { infoManagement } from "./team_questions/cn/info_management_json.js";
import { partnership } from "./team_questions/cn/partnership_json.js";
import { foodBeverage } from "./team_questions/cn/food_beverage_json.js";
import { ticketing } from "./team_questions/cn/ticketing_json.js";
import { publicRelations } from "./team_questions/cn/public_relations_json.js";
import { experience } from "./team_questions/cn/experience_json.js";
import { speakerCuration } from "./team_questions/cn/speaker_curation_json.js";
import { stageManagement } from "./team_questions/cn/stage_management_json.js";
import { production } from "./team_questions/cn/production_json.js";

export const json = {
  title: "TEDxPetalingStreet 志愿者申请表",
  showQuestionNumbers: "onPage",
  pages: [
    {
      name: "基本信息",
      elements: [
        {
          type: "text",
          name: "email",
          title: "电子邮件 *",
          isRequired: true
        },
        {
          type: "text",
          name: "name_ic",
          title: "身份证姓名 *",
          isRequired: true
        },
        {
          type: "text",
          name: "nickname",
          title: "小名"
        },
        {
          type: "radiogroup",
          name: "gender",
          title: "性别 *",
          isRequired: true,
          choices: [
            "女",
            "男",
            "其他"
          ]
        },
        {
          type: "dropdown",
          name: "age_group",
          title: "年龄层 *",
          isRequired: true,
          choices: [
            "18岁以下",
            "18-24",
            "25-34",
            "35-44",
            "45-54",
            "55-64",
            "65岁或以上"
          ]
        },
        {
          type: "text",
          inputType: "tel",
          name: "contact",
          title: "联络号码 *",
          isRequired: true,
          placeHolder: "例如：60123456789",
          validators: [
            {
              type: "regex",
              text: "请输入正确的电话号码格式",
              regex: "\\d{10,11}"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "language_preference",
          title: "语言偏好 *",
          isRequired: true,
          choices: [
            "我可以理解及使用中文回答",
            "我想使用英文版表格回答"
          ]
        },
        {
          type: "text",
          name: "education",
          title: "最高学历 *",
          isRequired: true,
          placeHolder: "例如：文学学士（主修传播与媒体研究）"
        }
      ]
    },
    {
      name: "经验与专长",
      elements: [
        {
          type: "text",
          name: "mandarin_proficiency",
          title: "请问您可以阅读及书写中文吗？ *",
          isRequired: true
        },
        {
          type: "text",
          name: "current_industry",
          title: "目前所在行业/学习领域 *",
          isRequired: true,
          placeHolder: "如您为学生，请注明您的课程"
        },
        {
          type: "comment",
          name: "tedx_attendance",
          title: "您是否曾参加过TEDxPetalingStreet活动？如有，请告知参加的场次。"
        }
      ]
    },
    {
      name: "志愿者偏好",
      elements: [
        {
          type: "radiogroup",
          name: "volunteer_preference",
          title: "您加入TEDxPetalingStreet志愿者的主要原因是？ *",
          isRequired: true,
          choices: [
            "希望从事与我所学/工作相关的角色",
            "想尝试新的领域/对任何机会持开放态度"
          ]
        },
        {
          type: "comment",
          name: "other_volunteering_experience",
          title: "除了TEDx之外，您有其他志愿服务经验吗？请描述您的角色。"
        }
      ]
    },
    {
      name: "组别选择",
      elements: [
        {
          type: "dropdown",
          name: "first_choice",
          title: "[第一选择] 您希望加入哪个组别？ *",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "第一选择和第二选择不能相同",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            "文案组",
            "主视觉-平面/动画设计组",
            "社交媒体组",
            "摄影及摄像组",
            "资讯管理组",
            "合作伙伴（资金/实物赞助）组",
            "餐饮组",
            "票务组",
            "公共关系组",
            "体验/展位/周边商品组",
            "讲者策划组",
            "舞台管理组",
            "制作组"
          ]
        },
        {
          type: "dropdown",
          name: "second_choice",
          title: "[第二选择] 您希望加入哪个组别？ *",
          isRequired: true,
          validators: [
            {
              type: "expression",
              text: "第一选择和第二选择不能相同",
              expression: "{second_choice} != {first_choice}"
            }
          ],
          choices: [
            "文案组",
            "主视觉-平面/动画设计组",
            "社交媒体组",
            "摄影及摄像组",
            "资讯管理组",
            "合作伙伴（资金/实物赞助）组",
            "餐饮组",
            "票务组",
            "公共关系组",
            "体验/展位/周边商品组",
            "讲者策划组",
            "舞台管理组",
            "制作组"
          ]
        },
        {
          type: "text",
          name: "dope_result",
          title: "DOPE性格测试结果 *",
          description: "请在此链接进行测试：https://richardstep.com/dope-personality-type-quiz/dope-bird-4-personality-types-test-questions-online-version/",
          isRequired: true,
          validators: [
            {
              type: "regex",
              text: "DOPE测试结果应该只有一个字母，D、O、P或E",
              regex: "^[DOPEdope]$"
            }
          ],
        }
      ]
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
      name: "面试与可用性",
      elements: [
        {
          type: "checkbox",
          name: "interview_slots",
          title: "请选择您方便参加面试的时间 *",
          isRequired: true,
          choices: [
            "23/3（星期六）Slot A - 11am",
            "23/3（星期六）Slot B - 3pm",
            "23/3（星期六）Slot C - 5pm",
            "24/3（星期日）Slot A - 11am",
            "24/3（星期日）Slot B - 3pm",
            "24/3（星期日）Slot C - 5pm",
            "以上时间均不便，请安排线上面试"
          ]
        },
        {
          type: "checkbox",
          name: "major_events",
          title: "请确认您是否能参加以下主要活动 *",
          isRequired: true,
          choices: [
            "2025年5月24日 | 迎新日",
            "2025年9月27日 | 年会前简报日",
            "2025年10月09日 | 彩排日（第一天）",
            "2025年10月10日 | 彩排日（第二天）",
            "2025年10月11日 | 年会当日",
            "2025年10月18日 | 庆功/感谢宴"
          ]
        }
      ]
    },
    {
      name: "附加信息",
      elements: [
        {
          type: "text",
          name: "location",
          title: "您在2025年4月至10月期间主要居住/活动的地点是？"
        },
        {
          type: "comment",
          name: "crazy_experience",
          title: "请描述您经历过的最疯狂或最有趣的事情，并说明原因。"
        },
        {
          type: "comment",
          name: "global_message",
          title: "如果您能向全世界发送一条短信，您会写些什么？为什么？"
        },
        {
          type: "comment",
          name: "additional_info",
          title: "请提供任何其他您希望我们了解的信息（例如：爱好、技能、特长等）。"
        }
      ]
    }
  ]
};
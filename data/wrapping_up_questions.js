export const wrappingUp = {
    name: "Other Questions | 其他问题",
    elements: [
        {
            type: "panel",
            name: "interview_panel",
            title: "About your availability | 了解您的空档时间",
            elements: [
                {
                    type: "checkbox",
                    name: "availability",
                    title: "Are you able to attend any of the events below? (You may choose more than one) | 以下的活动日期，您方便吗？（ 多项选择 ）",
                    description: `
                    These are the important events that we hope to see everyone attend.
                    You can discuss the contribution time for each group in the interview.

                    以下是我们所有人都期待发生的重要事件。
至于各个组别要求的贡献时间，可在面试中讨论。`,
                    isRequired: true,
                    choices: [
                        {
                            label: "Orientation Day - May 24, 2024 | 2024年5月24日 迎新日",
                            value: "2024年5月24日 | 迎新日"
                        },
                        {
                            label: "Pre-event Briefing Day - September 27, 2025 | 2025年9月27日 年会前简报日",
                            value: "2025年9月27日 | 年会前简报日"
                        },
                        {
                            label: "Rehearsal Day 1 - October 09, 2024 | 2024年10月09日 彩排日 第一天",
                            value: "2024年10月09日 | 彩排日 第一天"
                        },
                        {
                            label: "Rehearsal Day 2 - October 10, 2024 | 2024年10月10日 彩排日 第二天",
                            value: "2024年10月10日 |  彩排日 第二天"
                        },
                        {
                            label: "Event Day - October 11, 2025 | 2025年10月11日 年会当日",
                            value: "2025年10月11日 | 年会当日"
                        },
                        {
                            label: "Appreciation Dinner - October 18, 2025 | 2025年10月18日 庆功/感谢宴",
                            value: "2025年10月18日 | 庆功/感谢宴"
                        },
                    ]
                },
                {
                    type: "radiogroup",
                    name: "place_of_living",
                    title: "Where are you living at? | 请问您大部分时间都会在哪里生活/ 活动？",
                    description: "Please base your answer on the period from April to October | 请以来临的4月 - 10月为基准",
                    isRequired: true,
                    choices: [
                        {
                            label: "Klang Valley | 雪隆区",
                            value: "雪隆区"
                        },
                        {
                            label: "Peninsular Malaysia | 雪隆区之外（北南马）",
                            value: "雪隆区之外（北南马）"
                        },
                        {
                            label: "East Malaysia | 东马",
                            value: "东马"
                        },
                        {
                            label: "Overseas | 海外",
                            value: "海外"
                        }
                    ]
                },
            ]
        },
        {
            type: "panel",
            name: "know_more_panel",
            title: "We would like to know you more! | 请让我们更深入了解您",
            elements: [
                {
                    type: "comment",
                    name: "what_is_tedx_for_you",
                    title: "What kind of organization is TEDxPetalingStreet to you? | 对你来说， TEDxPetalingStreet 是一个什么样的组织？",
                    isRequired: true,
                },
                {
                    type: "radiogroup",
                    name: "mindset_choice",
                    title: "Which mindset theory resonates with you the most? | 以下哪个思维理论更贴切您？",
                    description: "Not familiar with these mindset theories? <a href='https://www.mindbodygreen.com/articles/be-do-have-model' target='_blank'>Click here to learn more</a> | 不了解这些思维理论？<a href='https://www.mindbodygreen.com/articles/be-do-have-model' target='_blank'>点击这里了解更多</a>",
                    isRequired: true,
                    choices: [
                        {
                            label: "HAVE—DO—BE",
                            value: "HAVE—DO—BE"
                        },
                        {
                            label: "DO—HAVE—BE",
                            value: "DO—HAVE—BE"
                        },
                        {
                            label: "BE—DO—HAVE",
                            value: "BE—DO—HAVE"
                        }
                    ]
                },
                {
                    type: "text",
                    name: "mindset_choice_explanation",
                    title: "Please briefly explain your choice for the previous question | 请简要说明您在上个问题的选择原因",
                    isRequired: true,
                },
                {
                    type: "radiogroup",
                    name: "dope_result",
                    title: "What is your Dope Bird Personality Test result? | 您的 Dope Bird Personality Test 结果是什么？",
                    description: "pdf+button",
                    isRequired: true,
                    choices: [
                      "Peacock | 孔雀",
                      "Dove | 鸽子",
                      "Owl | 猫头鹰",
                      "Eagle | 鹰",
                    ]
                },
                {
                    type: "comment",
                    name: "message_to_world",
                    title: "If you could send one message to everyone on Earth, what would you say and why? | 如果您可以给地球上的所有人发一条短信，您会写什么？ 为什么？",
                    isRequired: true,
                },
                {
                    type: "comment",
                    name: "other_messages",
                    title: "Feel free to share anything else you'd like us to know! | 欢迎和我们分享/补充，您想让我们知道的事！",
                    description: "Share your hobbies, skills, talents, and anything that might impress us! | 可以分享您的爱好， 所拥有的技术，才华与才艺等！让我们惊艳吧！",
                },
            ]
        }
    ]
};
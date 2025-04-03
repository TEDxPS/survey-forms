export const knowMoreQuestions = {
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
            // description: "Not familiar with these mindset theories? <a href='https://www.mindbodygreen.com/articles/be-do-have-model' target='_blank'>Click here to learn more</a> | 不了解这些思维理论？<a href='https://www.mindbodygreen.com/articles/be-do-have-model' target='_blank'>点击这里了解更多</a>",
            isRequired: true,
            choices: [
                {
                    text: "HAVE—DO—BE",
                    value: "HAVE—DO—BE"
                },
                {
                    text: "DO—HAVE—BE",
                    value: "DO—HAVE—BE"
                },
                {
                    text: "BE—DO—HAVE",
                    value: "BE—DO—HAVE"
                },
                {
                    text: "I don't understand the mindset | 我不了解这个思维",
                    value: "-"
                }
            ]
        },
        {
            type: "text",
            name: "mindset_choice_explanation",
            title: "Please briefly explain your choice for the previous question | 请简要说明您在上个问题的选择原因"
        },
        {
            type: "radiogroup",
            name: "dope_result",
            title: "What is your Dope Bird Personality Test result? | 您的 Dope Bird Personality Test 结果是什么？",
            description: "pdf+button",
            isRequired: true,
            choices: [
                "Peacock \\ 孔雀",
                "Dove \\ 鸽子",
                "Owl \\ 猫头鹰",
                "Eagle \\ 鹰",
            ]
        },
        {
            type: "comment",
            name: "message_to_world",
            title: "If you could send one message to everyone on Earth, what would you say and why? | 如果您可以给地球上的所有人发一条短信，您会写什么？ 为什么？",
        }, {

            type: "radiogroup",
            name: "recruitment_channel",
            title: "Where did you hear about the 2025 recruitment? | 您是从哪里得知 2025 招募信息的？",
            isRequired: true,
            showOtherItem: true,
            otherText: "Others (其他，请填写)",
            choices: [
                "Facebook (FB)", 
                "Instagram (IG)", 
                "Official Website (官网)", 
                "Friends & Family (亲朋好友)", 
                "Xiaohongshu (XHS) (小红书)", 
                "YouTube (优管)", 
                "Official Offline Events (官方线下活动，如年会 / 体验工坊)",
            ],

        },
        {
            type: "comment",
            name: "other_messages",
            title: "Feel free to share anything else you'd like us to know! | 欢迎和我们分享/补充，您想让我们知道的事！",
            description: "Share your hobbies, skills, talents, and anything that might impress us! | 可以分享您的爱好， 所拥有的技术，才华与才艺等！让我们惊艳吧！",
        },
    ],
}
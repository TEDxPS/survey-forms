export const socialMedia = {
    name: "社交媒体组",
    description: "社交媒体组负责管理线上平台",
    visibleIf: "{first_choice} = '社交媒体组'",
    elements: [
        {
            type: "text",
            name: "social_media_ques1",
            title: "社交媒体组问题1",
            isRequired: true,
        }
    ]
};
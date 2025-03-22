export const production = {
    name: "制作组",
    description: "制作组负责活动技术和设备管理",
    visibleIf: "{first_choice} = '制作组'",
    elements: [
        {
            type: "text",
            name: "production_ques1",
            title: "制作组问题1",
            isRequired: true,
        }
    ]
};
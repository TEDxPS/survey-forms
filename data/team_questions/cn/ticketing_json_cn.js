export const ticketing = {
    name: "票务组",
    description: "票务组负责活动票务管理",
    visibleIf: "{first_choice} = '票务组'",
    elements: [
        {
            type: "text",
            name: "ticketing_ques1",
            title: "票务组问题1",
            isRequired: true,
        }
    ]
};
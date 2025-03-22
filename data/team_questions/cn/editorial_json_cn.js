export const editorial = {
    name: "文案组",
    description: "文案组负责内容创作和编辑",
    visibleIf: "{first_choice} = '文案组'",
    elements: [
        {
            type: "text",
            name: "editorial_ques1",
            title: "文案组问题1",
            isRequired: true,
        }
    ]
};
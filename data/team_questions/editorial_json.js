export const editorial = {
    name: "Editorial | 文案组",
    description: "Editorial is editorial group | 文案组负责内容创作和编辑",
    visibleIf: "{first_choice} = 'Editorial'",
    elements: [
        {
            type: "text",
            name: "editorial_ques1",
            title: "Editorial Question 1 | 文案组问题1",
            isRequired: true,
        }
    ]
};
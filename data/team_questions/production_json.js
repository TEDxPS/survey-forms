export const production = {
    name: "Production | 制作",
    description: "Production team handles technical aspects of the event ｜ 制作组负责活动的技术方面",
    visibleIf: "{first_choice} == 'Production'",
    elements: [
        {
            type: "text",
            name: "production_ques1",
            title: "Production Question 1 ｜ 制作问题1",
            isRequired: true,
        }
    ]
};
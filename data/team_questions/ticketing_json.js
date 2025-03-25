export const ticketing = {
    name: "Ticketing | 票务",
    description: "Ticketing team handles event admission and registration | 票务团队负责事件入场和注册",
    visibleIf: "{first_choice} == 'Ticketing'",
    elements: [
        {
            type: "text",
            name: "ticketing_ques1",
            title: "Ticketing Question 1 | 票务问题1",
            isRequired: true,
        }
    ]
};
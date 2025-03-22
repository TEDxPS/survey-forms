export const ticketing = {
    name: "Ticketing",
    description: "Ticketing team handles event admission and registration",
    visibleIf: "{first_choice} = 'Ticketing'",
    elements: [
        {
            type: "text",
            name: "ticketing_ques1",
            title: "Ticketing Question 1",
            isRequired: true,
        }
    ]
};
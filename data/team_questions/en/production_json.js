export const production = {
    name: "Production",
    description: "Production team handles technical aspects of the event",
    visibleIf: "{first_choice} = 'Production'",
    elements: [
        {
            type: "text",
            name: "production_ques1",
            title: "Production Question 1",
            isRequired: true,
        }
    ]
};
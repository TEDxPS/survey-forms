export const publicRelations = {
    name: "Public Relations",
    description: "Public Relations team manages external communications",
    visibleIf: "{first_choice} = 'Public Relations'",
    elements: [
        {
            type: "text",
            name: "public_relations_ques1",
            title: "Public Relations Question 1",
            isRequired: true,
        }
    ]
};
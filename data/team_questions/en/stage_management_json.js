export const stageManagement = {
    name: "Stage Management",
    description: "Stage Management team handles event flow and logistics",
    visibleIf: "{first_choice} = 'Stage Management'",
    elements: [
        {
            type: "text",
            name: "stage_management_ques1",
            title: "Stage Management Question 1",
            isRequired: true,
        }
    ]
};
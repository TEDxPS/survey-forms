export const infoManagement = {
    name: "Information Management",
    description: "Information Management team handles data and information flow",
    visibleIf: "{first_choice} = 'Information Management'",
    elements: [
        {
            type: "text",
            name: "info_management_ques1",
            title: "Information Management Question 1",
            isRequired: true,
        }
    ]
};
export const infoManagement = {
    name: "Information Management | 信息管理",
    description: "Information Management team handles data and information flow | 信息管理团队负责数据和信息流",
    visibleIf: "{first_choice} = 'Information Management'",
    elements: [
        {
            type: "text",
            name: "info_management_ques1",
            title: "Information Management Question 1 | 信息管理问题1",
            isRequired: true,
        }
    ]
};
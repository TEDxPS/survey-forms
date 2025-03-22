export const infoManagement = {
    name: "资讯管理组",
    description: "资讯管理组负责数据和信息流管理",
    visibleIf: "{first_choice} = '资讯管理组'",
    elements: [
        {
            type: "text",
            name: "info_management_ques1",
            title: "资讯管理组问题1",
            isRequired: true,
        }
    ]
};
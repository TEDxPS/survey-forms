export const stageManagement = {
    name: "舞台管理组",
    description: "舞台管理组负责活动流程和后勤",
    visibleIf: "{first_choice} = '舞台管理组'",
    elements: [
        {
            type: "text",
            name: "stage_management_ques1",
            title: "舞台管理组问题1",
            isRequired: true,
        }
    ]
};
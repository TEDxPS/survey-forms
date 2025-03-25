export const stageManagement = {
    name: "Stage Management | 舞台管理",
    description: "Stage Management team handles event flow and logistics | 舞台管理团队负责事件流程和后勤",
    visibleIf: "{first_choice} == 'Stage Management'",
    elements: [
        {
            type: "text",
            name: "stage_management_ques1",
            title: "Stage Management Question 1 | 舞台管理问题1",
            isRequired: true,
        }
    ]
};
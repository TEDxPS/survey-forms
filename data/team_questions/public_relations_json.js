export const publicRelations = {
    name: "Public Relations | 公共关系",
    description: "Public Relations team manages external communications | 公共关系团队负责外部沟通",
    visibleIf: "{first_choice} == 'Public Relations'",
    elements: [
        {
            type: "text",
            name: "public_relations_ques1",
            title: "Public Relations Question 1 | 公共关系问题1",
            isRequired: true,
        }
    ]
};
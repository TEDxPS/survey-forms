export const publicRelations = {
    name: "公共关系组",
    description: "公共关系组负责对外沟通和媒体关系",
    visibleIf: "{first_choice} = '公共关系组'",
    elements: [
        {
            type: "text",
            name: "public_relations_ques1",
            title: "公共关系组问题1",
            isRequired: true,
        }
    ]
};
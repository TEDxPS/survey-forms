export const speakerCuration = {
    name: "讲者策划组",
    description: "讲者策划组负责选择和管理演讲者",
    visibleIf: "{first_choice} = '讲者策划组'",
    elements: [
        {
            type: "text",
            name: "speaker_curation_ques1",
            title: "讲者策划组问题1",
            isRequired: true,
        }
    ]
};
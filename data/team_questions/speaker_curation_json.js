export const speakerCuration = {
    name: "Speaker Curation | 讲者策划",
    description: "Speaker Curation team manages speaker selection and coordination | 讲者策划团队负责演讲者选择和协调",
    visibleIf: "{first_choice} == 'Speaker Curation'",
    elements: [
        {
            type: "text",
            name: "speaker_curation_ques1",
            title: "Speaker Curation Question 1 | 讲者策划问题1",
            isRequired: true,
        }
    ]
};
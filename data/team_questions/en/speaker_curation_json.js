export const speakerCuration = {
    name: "Speaker Curation",
    description: "Speaker Curation team manages speaker selection and coordination",
    visibleIf: "{first_choice} = 'Speaker Curation'",
    elements: [
        {
            type: "text",
            name: "speaker_curation_ques1",
            title: "Speaker Curation Question 1",
            isRequired: true,
        }
    ]
};
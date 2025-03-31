export const interviewTimeB = {
    name: "Date and Time for the Interview | 您方便面试的日期与时间",
    description: "Please note that the following interview times are only for us to preliminarily understand your availability. If you qualify, you will receive our official interview invitation. | 请注意，以下面试时间仅供我们初步了解您方便的面试时间。如果您符合资格，您将收到我们的官方面试邀请。",
    visibleIf: "{first_choice} = 'Speaker Curation' or {first_choice} = 'Information Technology' or {first_choice} = 'Editorial' or {first_choice} = 'Social Media' or {first_choice} = 'Visual' or {first_choice} = 'Hall & Floor' or {first_choice} = 'Logistic' or {first_choice} = 'Experience'",
    elements: [
        {
            type: "panel",
            name: "interview_panel",
            elements: [
                {
                    type: "checkbox",
                    name: "interview_time_b",
                    title: "Please tick date and time that you will be available for interviews (you may tick more than one) | 请选择您方便面试的日期与时间 (可多选)",
                    isRequired: true,
                    choices: [
                        {
                            label: "26/4 (星期六 Saturday）Slot A - 11am",
                            value: "26/4 (星期六 Saturday）Slot）Slot A - 11am"
                        },
                        {
                            label: "26/4 (星期六 Saturday）Slot）Slot B - 2pm",
                            value: "26/4 (星期六 Saturday）Slot）Slot B - 2pm"
                        },
                        {
                            label: "26/4 (星期六 Saturday）Slot）Slot C - 4pm",
                            value: "26/4 (星期六 Saturday）Slot）Slot C - 4pm"
                        },
                        {
                            label: "04/5 (星期日 Sunday）Slot A - 11am",
                            value: "04/5 (星期日 Sunday）Slot）Slot A - 11am"
                        },
                        {
                            label: "04/5 (星期日 Sunday）Slot）Slot B - 2pm",
                            value: "04/5 (星期日 Sunday）Slot）Slot B - 2pm"
                        },
                        {
                            label: "04/5 (星期日 Sunday）Slot）Slot C - 4pm",
                            value: "04/5 (星期日 Sunday）Slot）Slot C - 4pm"
                        },
                    ]
                },
            ]
        }
    ]
};
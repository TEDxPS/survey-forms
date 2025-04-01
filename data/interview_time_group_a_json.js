export const interviewTimeA = {
    name: "Date and Time for the Interview | 您方便面试的日期与时间",
    description: "Please note that the following interview times are only for us to preliminarily understand your availability. If you qualify, you will receive our official interview invitation. | 请注意，以下面试时间仅供我们初步了解您方便的面试时间。如果您符合资格，您将收到我们的官方面试邀请。",
    visibleIf: "{first_choice} = 'Partnership' or {first_choice} = 'Food & Beverage' or {first_choice} = 'Public Relations' or {first_choice} = 'Ticketing' or {first_choice} = 'Volunteer Management' or {first_choice} = 'Production' or {first_choice} = 'Video & Photo'",
    elements: [
        {
            type: "panel",
            name: "interview_panel",
            elements: [
                {
                    type: "checkbox",
                    name: "interview_time",
                    title: "Please tick date and time that you will be available for interviews (you may tick more than one) | 请选择您方便面试的日期与时间 (可多选)",
                    isRequired: true,
                    choices: [
                        {
                            label: "27/4 (星期日 Sunday）Slot A - 11am",
                            value: "27/4 (星期日 Sunday）Slot A - 11am"
                        },
                        {
                            label: "27/4 (星期日 Sunday）Slot B - 2pm",
                            value: "27/4 (星期日 Sunday）Slot B - 2pm"
                        },
                        {
                            label: "27/4 (星期日 Sunday）Slot C - 4pm",
                            value: "27/4 (星期日 Sunday）Slot C - 4pm"
                        },
                        {
                            label: "03/5 (星期六 Saturday）Slot A - 11am",
                            value: "03/5 (星期六 Saturday）Slot A - 11am"
                        },
                        {
                            label: "03/5 (星期六 Saturday）Slot B - 2pm",
                            value: "03/5 (星期六 Saturday）Slot B - 2pm"
                        },
                        {
                            label: "03/5 (星期六 Saturday）Slot C - 4pm",
                            value: "03/5 (星期六 Saturday）Slot C - 4pm"
                        },
                    ]
                },
            ]
        }
    ]
};
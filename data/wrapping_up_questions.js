export const wrappingUp = {
    name: "interview_panel",
    title: "About your availability | 了解您的空档时间",
    elements: [
        {
            type: "checkbox",
            name: "availability",
            title: "Are you able to attend any of the events below? (You may choose more than one) | 以下的活动日期，您方便吗？（ 多项选择 ）",
            description: `These are the important events that we hope to see everyone attend. You can discuss the contribution time for each group in the interview.\n以下是我们所有人都期待发生的重要事件。至于各个组别要求的贡献时间，可在面试中讨论。`,
            isRequired: true,
            choices: [
                {
                    text: "Orientation Day - May 24, 2025 \\ 2025年5月24日 迎新日",
                    value: "2025年5月24日 \\ 迎新日"
                },
                {
                    text: "Pre-event Briefing Day - September 27, 2025 \\ 2025年9月27日 年会前简报日",
                    value: "2025年9月27日 \\ 年会前简报日"
                },
                {
                    text: "Rehearsal Day 1 - October 09, 2025 \\ 2025年10月09日 彩排日 第一天",
                    value: "2025年10月09日 \\ 彩排日 第一天"
                },
                {
                    text: "Rehearsal Day 2 - October 10, 2025 \\ 2025年10月10日 彩排日 第二天",
                    value: "2025年10月10日 \\  彩排日 第二天"
                },
                {
                    text: "Event Day - October 11, 2025 \\ 2025年10月11日 年会当日",
                    value: "2025年10月11日 \\ 年会当日"
                },
                {
                    text: "Appreciation Dinner - October 18, 2025 \\ 2025年10月18日 庆功/感谢宴",
                    value: "2025年10月18日 \\ 庆功/感谢宴"
                },
            ]
        },
        {
            type: "radiogroup",
            name: "place_of_living",
            title: "Where are you living at? | 请问您大部分时间都会在哪里生活/ 活动？",
            description: "Please base your answer on the period from April to October | 请以来临的4月 - 10月为基准",
            isRequired: true,
            choices: [
                {
                    text: "Klang Valley | 雪隆区",
                    value: "雪隆区"
                },
                {
                    text: "Peninsular Malaysia | 雪隆区之外（北南马）",
                    value: "雪隆区之外（北南马）"
                },
                {
                    text: "East Malaysia | 东马",
                    value: "东马"
                },
                {
                    text: "Overseas | 海外",
                    value: "海外"
                }
            ]
        },
    ]
};
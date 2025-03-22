export const partnership = {
    name: "合作伙伴（资金/实物赞助）组",
    description: "合作伙伴组负责寻找和管理赞助商",
    visibleIf: "{first_choice} = '合作伙伴（资金/实物赞助）组'",
    elements: [
        {
            type: "text",
            name: "partnership_ques1",
            title: "合作伙伴组问题1",
            isRequired: true,
        }
    ]
};
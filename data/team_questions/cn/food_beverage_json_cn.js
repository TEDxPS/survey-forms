export const foodBeverage = {
    name: "餐饮组",
    description: "餐饮组负责活动餐饮安排",
    visibleIf: "{first_choice} = '餐饮组'",
    elements: [
        {
            type: "text",
            name: "food_beverage_ques1",
            title: "餐饮组问题1",
            isRequired: true,
        }
    ]
};
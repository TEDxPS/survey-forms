export const foodBeverage = {
    name: "Food & Beverage | 餐饮",
    description: "Food & Beverage team manages catering and refreshments | 餐饮组负责餐饮和饮料",
    visibleIf: "{first_choice} = 'Food & Beverage'",
    elements: [
        {
            type: "text",
            name: "food_beverage_ques1",
            title: "Food & Beverage Question 1 | 餐饮问题1",
            isRequired: true,
        }
    ]
};
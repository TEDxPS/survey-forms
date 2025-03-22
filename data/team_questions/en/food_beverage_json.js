export const foodBeverage = {
    name: "Food & Beverage",
    description: "Food & Beverage team manages catering and refreshments",
    visibleIf: "{first_choice} = 'Food & Beverage'",
    elements: [
        {
            type: "text",
            name: "food_beverage_ques1",
            title: "Food & Beverage Question 1",
            isRequired: true,
        }
    ]
};
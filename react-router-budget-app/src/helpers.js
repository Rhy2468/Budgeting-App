// Local storage functions  
export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

// delete item
export const deleteItem = ({key}) => {
    return localStorage.removeItem(key)
}

//colors
const generateRandomColor = () => {
    const existingBudgetLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetLength * 24} 65% 50%`
}

//create budget 
export const createBudget = ({name, amount}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name : name,
        createAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }

    const existingBudgets = fetchData("budgets") ?? []; 
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

//create expense
export const createExpense = ({name, amount, budgetId}) => {
    const newItem = {
        id: crypto.randomUUID(),
        name : name,
        createAt: Date.now(),
        amount: +amount,
        budgetId: budgetId
    }

    const existingExpenses = fetchData("expenses") ?? []; 
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

//wait time 
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))

//Format currency 
export const formatCurrency = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "currency",
        currency: "CAD"
    })
}

//total spend by budget 
export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((acc, expense) => {
        // check expense ID == budgetID passed in 
        if(expense.budgetId !== budgetId) return acc

        //add the current amount to total
        return acc += expense.amount

    }, 0)
    return budgetSpent;
}

//formatting percentages 
export const percentage = (amt) => {
    return amt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0,
    })
}


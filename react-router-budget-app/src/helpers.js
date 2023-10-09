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

//wait time 
export const wait = () => new Promise(res => setTimeout(res, Math.random() * 800))
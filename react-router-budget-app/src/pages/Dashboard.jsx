// React Router Dom imports
import { useLoaderData } from "react-router-dom"

// Helper functions
import { createBudget, createExpense, fetchData, wait } from "../helpers"

//components
import Intro from "../components/Intro"
import { toast } from "react-toastify"
import AddBudgetForm from "../components/AddBudgetForm"
import AddExpenseForm from "../components/AddExpenseForm"
import BudgetItem from "../components/BudgetItem"
import Table from "../components/Table"

// loader 
export function dashboardLoader(){
    //helper function 
    const userName = fetchData("userName")
    const budgets = fetchData("budgets")
    const expenses = fetchData("expenses")
    return { userName, budgets, expenses }
}

//action
export async function dashboardAction({request}){
    await wait();
    const data = await request.formData();


    const {_action, ...values} = Object.fromEntries(data)

    //new user submission 
    if (_action === "newUser"){
        try{
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success("Welcome!")
        } catch(e){
            throw new Error("Problem Creating Account")
        }
    }

    if (_action === "createBudget"){
        try{
            // create Budget 
            createBudget({
                name: values.newBudget,
                amount: values.newBudgetAmount,
            })
            return toast.success("Budget Created")
        } catch(e){
            throw new Error("Problem Creating Budget")
        }
    }

    if (_action === "createExpense"){
        try{
            // create expense
            createExpense({
                name: values.newExpense,
                amount: values.newExpenseAmount,
                budgetId: values.newExpenseBudget
            })
            return toast.success("New Expense Created")
        } catch(e){
            throw new Error("Problem Creating Budget")
        }
    }
}

const Dashboard = () =>{
    const{ userName, budgets, expenses } = useLoaderData();

    return(
        <div>
            {userName ? (
                <div className="dashboard">
                    <h1>Welcome back, <span className="accent">{userName}</span></h1>
                    <div className="grid-sm">
                        {   
                            budgets && budgets.length > 0 ? (
                                <div className="grid-lg">
                                    <div className="flex-lg">
                                        <AddBudgetForm />
                                        <AddExpenseForm budgets={budgets} />
                                    </div>

                                    {
                                        expenses && expenses.length > 0 &&(
                                            <div className="grid-mid">
                                                <h2>Recent Expenses</h2>
                                                <Table expenses={expenses.sort((a,b) => b.createdAt - 
                                                    a.createdAt)} />

                                            </div>
                                        )
                                    }

                                    <h2>Existing Budgets</h2>
                                    <div className="budgets">
                                        {
                                            budgets.map((budget) => (
                                                <BudgetItem key = {budget.id} budget = {budget} />
                                            ))
                                        }
                                    </div>
                                </div>
                            ) :(
                                <div className="grid-sm">
                                    <p>Create a Budget</p>
                                    <AddBudgetForm />
                                </div>
                            )
                        }
                    </div>
                </div>
            ) : (<Intro />)}
        </div>
    )
}
export default Dashboard
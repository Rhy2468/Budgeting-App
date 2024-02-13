import { useLoaderData } from "react-router-dom";
import {createExpense, deleteItem, getAllMatchingItems } from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseForm from "../components/AddExpenseForm";
import Table from "../components/Table";
import { toast } from "react-toastify";
//loader
export async function budgetLoader({ params }) {
    const budget = await getAllMatchingItems({
      category: "budgets",
      key: "id",
      value: params.id,
    })[0];
  
    const expenses = await getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });
  
    if (!budget) {
      throw new Error("Budget does not exist");
    }
  
    return {budget, expenses};
}

//action
export async function budgetAction({ request }) {
    const data = await request.formData();
    const {_action, ...values} = Object.fromEntries(data)

    if (_action === "deleteExpense"){
        try{
            // create expense
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            });
            return toast.success("Expense Deleted")
        } catch(e){
            throw new Error("Problem deleting item")
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
            throw new Error("Problem Creating Expense")
        }
    }
}


const BudgetPage = () => {
    const {budget, expenses} = useLoaderData();
    return (
        <div className="grid-lg">
            <h1 className="h2">
                <span className="accent">{budget.name} </span>
                 Overview 
            </h1>
            <div className="flex-lg">
                <BudgetItem budget={budget} showDelete = {true}/>
                <AddExpenseForm budgets={[budget]}/>
            </div>
            {
                expenses && expenses.length > 0 && (
                    <div className="grid-md">
                        <h2><span className="accent">Expenses</span></h2>
                        <Table expenses={expenses} />
                    </div>

                )
            }
        </div>
    )
};
export default BudgetPage;

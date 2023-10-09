import { useRef } from "react"
import { useFetcher } from "react-router-dom"

const AddExpenseForm = ({budgets}) => {
    const formRef = useRef()
    const focusRef = useRef()
    const fetcher = useFetcher()

    return (
        <div className="form-wrapper">
            <h2 className="h3">Add New {" "}<span className="accent">
                {budgets.length === 1 && `${budgets.map((budg) => budg.name)}`}
                </span>{" "}
                Expense
            </h2>

            <fetcher.Form 
                method = "post"
                className="grid-sm"
                ref={formRef}
                >
                
                <div className="expense_inputs">
                    <div className="grid-xs">
                        <label htmlFor="newExpense">Expense Name</label>
                        <input 
                        type="text" 
                        name="newExpense"
                        id="newExpense"
                        placeholder="e.g. Drinks"
                        ref = {focusRef}
                        required
                        />
                    </div>

                    <div className="grid-xs">
                        <label htmlFor="newExpenseAmount">Amount</label>
                        <input 
                        type="number" 
                        name="newExpenseAmount"
                        id="newExpenseAmount"
                        step="0.01"
                        inputMode="decimal"
                        placeholder="e.g., 6.99"
                        required
                        />
                    </div>
                </div>
                <div className="grid-xs">
                    <label htmlFor="newExpenseBudget">Budget Category</label>
                    <select name="newExpenseBudget" id="newExpenseBudget" required>
                        {
                            budgets
                            .sort((a, b) => a.createdAt - b.createdAt)
                            .map((budget) => {
                                return(
                                    <option key={budget.id} value={budget.id}>
                                        {budget.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
            </fetcher.Form>
        </div>
    )
}

export default AddExpenseForm
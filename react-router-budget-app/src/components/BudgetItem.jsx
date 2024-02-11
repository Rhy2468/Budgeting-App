import { formatCurrency, calculateSpentByBudget, percentage } from "../helpers"

const BudgetItem = ({budget}) => {
    const spent = calculateSpentByBudget(budget.id);
  
    return (
        <div className="budget">
            <div className="progressText">
                <h3>
                    {budget.name}
                </h3>
                <p>
                    {formatCurrency(budget.amount)} Budgeted
                </p>
            </div>

            <progress max = {budget.amount} value ={spent}>
                {percentage(spent / budget.amount)}

            </progress>

            <div className="progressText">
                <small>{formatCurrency(spent)} spent of </small>
                <small>{formatCurrency(budget.amount - spent)}</small>
            </div>
        </div>
    )
}

export default BudgetItem
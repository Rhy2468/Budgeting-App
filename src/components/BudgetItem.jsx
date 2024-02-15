import { Form, Link } from "react-router-dom";
import { formatCurrency, calculateSpentByBudget, percentage } from "../helpers"

const BudgetItem = ({budget, showDelete = false}) => {
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
            {
                showDelete ? (
                    <div className="flex-sm">
                        <Form 
                        method="post"
                        action="delete"
                        onSubmit={(event)=>{
                            if (!confirm("Are you sure you want to delete this?")){
                                event.preventDefault();
                            }
                        }}>
                            <button type="submit" className="btn">
                                <span>Delete Budget</span>
                            </button>
                        </Form>
                    </div>
                ) : (
                    <div className="flex-sm">
                        <Link
                        to={`/Budgeting-App/budget/${budget.id}`}
                        className="btn"
                        >
                        <span>View Details</span>
                        </Link>
                    </div>
                
                ) 
            }
        </div>
    )
}

export default BudgetItem
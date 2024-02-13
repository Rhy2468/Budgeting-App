import ExpenseItem from "./ExpenseItem"

const Table = ({expenses, showBudget = true}) => {
    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                        {
                            ["Name", "Amount","Budget" , "Date", ""].map((i, index) => (
                                <th key={index}>{i}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        expenses.map((expense) => (
                            <tr key={expense.id}>
                                <ExpenseItem expense={expense}/>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
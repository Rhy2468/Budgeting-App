//React Router Imports 
import { Form, NavLink } from "react-router-dom"

const Nav = ({userName}) => {
    return(
        <nav>
            <NavLink
                to="/Budgeting-App/"
                aria-label = "Go to Home"
            >
                <span>Budget Tracker</span>
            </NavLink>
            {
                userName && (
                    <Form
                        method="post"
                        action="/Budgeting-App/logout"
                        onSubmit={(event) => {
                            if (!confirm("Switch Users and Data?")) {
                                event.preventDefault()
                            }
                        }}
                    >
                        <button type="submit" className="btn btn--warning">
                            <span>Switch User</span>
                        </button>
                    </Form>
                )
            }
        </nav>
    )
}
export default Nav
import { useNavigate, useRouteError } from "react-router-dom"

//library imports
import { HomeIcon, ArrowUturnLeftIcon } from "@heroicons/react/24/solid"

const Error = () =>{

    const error = useRouteError();
    const navigate = useNavigate();
    
    return(
        <div className="error">
            <h1>Error has occured</h1>
            <p>{error.message || error.statusTest}</p>

            <div className="flex-md">
                <button className="btn btn--dark" onClick={() => navigate(-1)}>
                    <ArrowUturnLeftIcon width={20} />
                    <span>Go Back</span>
                </button>
            </div>
        </div>
    )
}

export default Error

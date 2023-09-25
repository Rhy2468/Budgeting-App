// React Router Dom imports
import { useLoaderData } from "react-router-dom"

// Helper functions
import { fetchData } from "../helpers"

// loader 
export function dashboardLoader(){
    //helper function 
    const userName = fetchData("userName")
    return { userName }
}

const Dashboard = () =>{
    const{ userName } = useLoaderData()

    return(
        <div>
            {userName ? (<p>{userName}</p>) : (<Intro />)}
            Dashboard
        </div>
    )
}
export default Dashboard
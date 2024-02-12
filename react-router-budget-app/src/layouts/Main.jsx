// React Router Dom imports
import { Outlet, useLoaderData } from "react-router-dom"

//components
import Nav from "../components/Nav"

// Helper functions
import { fetchData } from "../helpers"

// loader 
export function mainLoader(){
    //helper function 
    const userName = fetchData("userName")
    return { userName }
}

const Main = () =>{
    const{ userName } = useLoaderData()

    return(
        <div className="layout">
            <Nav userName={userName} />
            <main>
                <Outlet />
            </main>
        </div>
    )
}
export default Main
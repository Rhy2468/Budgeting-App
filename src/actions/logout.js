//React Router Imports
import { redirect } from "react-router-dom";

//helpers
import { deleteItem } from "../helpers";

//library
import { toast } from "react-toastify";

export async function logoutAction(){
    //delete the user
    deleteItem({
        key: "userName"
    })
    toast.success("Switching Users")

    //return redirect
    return redirect("/")
}
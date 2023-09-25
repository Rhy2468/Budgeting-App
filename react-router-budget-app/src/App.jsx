import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

//library 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//actions
import { logoutAction } from "./actions/logout";

//layouts
import Main, { mainLoader } from "./layouts/Main";

//Routes
import Dashboard, { dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/error";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children:[
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        errorElement: <Error />
      },

      {
        path: "logout", 
        action: logoutAction
      }
    ]
  },
]);

function App() {
  return <div className="App">
    <RouterProvider router={router} />
    <ToastContainer />
  </div>;
  
}

export default App;

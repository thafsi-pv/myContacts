import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import ListContacts from "./pages/ListContacts";
import ContactDetails from "./pages/ContactDetails";
import AddContact from "./pages/AddContact";
import AddDept from "./pages/AddDept";
import BottomNavigation from "./components/BottomNavigation";
import MainPage from "./pages/MainPage";
import Settings from "./pages/Settings";
import Designation from "./pages/Designation";
import User from "./pages/User";
import Login from "./pages/Login";
import { ThemeContext } from "./context/ThemeContext";
import { useContext, useEffect } from "react";
import SignUp from "./pages/SignUp";
import InternetConnection from "./pages/OfflineMessage";
import { Toaster } from "react-hot-toast";

function App() {
  const { theme } = useContext(ThemeContext);
  const isOnline = navigator.onLine;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("myc_token");
    if (!token && window.location.pathname !== "/login") {
      //window.location = "/login";
     // navigate("/login");
    }
  });

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "/",
          element: <ListContacts />,
        },
        {
          path: "/contactDetails/:id",
          element: <ContactDetails />,
        },
        {
          path: "/addNew",
          element: <AddContact />,
        },
        {
          path: "/updateContact/:id",
          element: <AddContact />,
        },
        {
          path: "/dept",
          element: <AddDept />,
        },
        {
          path: "/settings",
          element: <Settings />,
        },
        {
          path: "/designation",
          element: <Designation />,
        },
        {
          path: "/users",
          element: <User />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
  ]);

  return (
    <div>
      <InternetConnection>
        <div className="h-screen max-h-screen" data-theme={theme}>
          <RouterProvider router={appRouter} />
          <Toaster />
        </div>
      </InternetConnection>
    </div>
  );
}

export default App;

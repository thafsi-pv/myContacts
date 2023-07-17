import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import  { ThemeContext } from "./context/ThemeContext";
import { useContext } from "react";

function App() {
  const { theme } = useContext(ThemeContext);

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
  ]);

  return (
      <div className="h-screen max-h-screen" data-theme={theme}>
        <RouterProvider router={appRouter} />
      </div>
  );
}

export default App;

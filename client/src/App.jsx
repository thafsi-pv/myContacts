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

function App() {
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
  ]);

  return (
    <div className="max-h-screen">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

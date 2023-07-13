import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ListContacts from "./pages/ListContacts";
import ContactDetails from "./pages/ContactDetails";
import AddContact from "./pages/AddContact";
import AddDept from "./pages/AddDept";
import BottomNavigation from "./components/BottomNavigation";
import MainPage from "./pages/MainPage";
import Settings from "./pages/Settings";

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

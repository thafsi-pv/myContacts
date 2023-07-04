import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import ListContacts from "./pages/ListContacts";
import ContactDetails from "./pages/ContactDetails";
import AddContact from "./pages/AddContact";
import BottomNavigation from "./components/BottomNavigation";
import MainPage from "./pages/MainPage";

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
          path: "/contactDetails",
          element: <ContactDetails />,
        },
        {
          path: "/addNew",
          element: <AddContact />,
        },
      ],
    },
  ]);

  return (
    <div className="h-screen">
      <RouterProvider router={appRouter} />
    </div>
  );
}

export default App;

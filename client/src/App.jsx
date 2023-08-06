import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import { Suspense, lazy, useContext, useEffect } from "react";
import "./App.css";
const ListContactComponent = lazy(() => import("./pages/ListContacts"));
const ContactDetails = lazy(() => import("./pages/ContactDetails"));
const AddContact = lazy(() => import("./pages/AddContact"));
const AddDept = lazy(() => import("./pages/AddDept"));
const MainPage = lazy(() => import("./pages/MainPage"));
const Settings = lazy(() => import("./pages/Settings"));
const Designation = lazy(() => import("./pages/Designation"));
const User = lazy(() => import("./pages/User"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));
import { ThemeContext } from "./context/ThemeContext";
import InternetConnection from "./pages/OfflineMessage";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import store from "./redux/store";
import Loader from "./components/Loader";
function App() {
  const { theme } = useContext(ThemeContext);
  const isOnline = navigator.onLine;

  useEffect(() => {
    const token = localStorage.getItem("myc_token");
    if (!token && window.location.pathname !== "/login") {
      window.location = "/login";
      // navigate("/login");
    }
  });

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<Loader />}>
          <MainPage />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: (
            <Suspense fallback={<Loader />}>
              <ListContactComponent />
            </Suspense>
          ),
        },
        {
          path: "/contactDetails/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <ContactDetails />
            </Suspense>
          ),
        },
        {
          path: "/addNew",
          element: (
            <Suspense fallback={<Loader />}>
              <AddContact />
            </Suspense>
          ),
        },
        {
          path: "/updateContact/:id",
          element: (
            <Suspense fallback={<Loader />}>
              <AddContact />
            </Suspense>
          ),
        },
        {
          path: "/dept",
          element: (
            <Suspense fallback={<Loader />}>
              <AddDept />
            </Suspense>
          ),
        },
        {
          path: "/settings",
          element: (
            <Suspense fallback={<Loader />}>
              <Settings />
            </Suspense>
          ),
        },
        {
          path: "/designation",
          element: (
            <Suspense fallback={<Loader />}>
              <Designation />
            </Suspense>
          ),
        },
        {
          path: "/users",
          element: (
            <Suspense fallback={<Loader />}>
              <User />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/login",
      element: (
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/signup",
      element: (
        <Suspense fallback={<Loader />}>
          <SignUp />
        </Suspense>
      ),
    },
  ]);

  return (
    <div>
      <Provider store={store}>
        <InternetConnection>
          <div className="h-screen overflow-hidden" data-theme={theme}>
            <RouterProvider router={appRouter} />
            <Toaster />
          </div>
        </InternetConnection>
      </Provider>
    </div>
  );
}

export default App;

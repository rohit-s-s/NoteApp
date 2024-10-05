import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import AddNotes from "./pages/Notes/AddNotes";
import EditNotes from "./pages/Notes/EditNotes";
import Dasboard from "./pages/Dasboard";
import AuthLayout from "./layout/AuthLayout";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        {/*Public Routes */}
        <Route element={<AuthLayout/>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
       
        {/*Protected Routes */}
        <Route element={<ProtectedRoute/>}>
          <Route element={<AuthLayout/>}>
            <Route path="addnotes" element={<AddNotes />} />
            <Route path="editnotes/:id" element={<EditNotes />} />
          </Route>
            <Route path="/" element={<Dasboard/>}/>
        </Route>

        {/*caych all routes */}
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;

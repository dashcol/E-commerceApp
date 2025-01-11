import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home";
import NavBar from "./components/nav/nav";
import AppContext from "./Context/Context";
import Products from "./components/products/products";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Cart from "./components/cart/cart";
import ProtectedRoute from "./protect/protected";
import Order from "./components/order/order";
import Forgot from "./components/forgot-pass/forgot-pass";
import Error from "./components/Error/Error";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      errorElement: <Error />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          children: [
            { index: true, element: <Login /> },
            {
              path: "forgot-password",
              element: <Forgot />,
            },
          ],
        },
        { path: "/signup", element: <Signup /> },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "order",
          element: (
            <ProtectedRoute>
              <Order />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ]);
  return (
    <>
      <AppContext>
        <RouterProvider router={router} />
      </AppContext>
    </>
  );
}

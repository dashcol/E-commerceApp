import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/home/home";
import NavBar from "./components/nav/nav";
import AppContext from "./Context/Context";
import Products from "./components/products/products";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import Cart from "./cart/cart";
import ProtectedRoute from "./protect/protected";
import Order from "./order/order";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
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
        { path: "login", element: <Login /> },
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

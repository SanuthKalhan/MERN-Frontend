import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Navigation from './component/Navigation';
import Home from './pages/Home.js'
import Login from './pages/Login.js'
import Signup from './pages/Signup.js';
import NewProduct from "./pages/NewProduct";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";
import EditProductPage from "./pages/EditProductPage";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { addNotification } from "./features/userSlice";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const socket = io("ws://localhost:8080");
        socket.off("notification").on("notification", (msgObj, user_id) => {
            // logic for notification
            if (user_id === user._id) {
                dispatch(addNotification(msgObj));
            }
        });

        socket.off("new-order").on("new-order", (msgObj) => {
            if (user.isAdmin) {
                dispatch(addNotification(msgObj));
            }
        });
    }, []);
  return (
    <div className="app-background">
      <div className="App">
          <BrowserRouter>
            <Navigation/>
              <Routes>
              <Route index element={<Home />} />
                    {!user && (
                        <>
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                        </>
                    )}

                    {user && (
                        <>
                            <Route path="/cart" element={<CartPage />} />
                            <Route path="/orders" element={<OrdersPage />} />
                        </>
                    )}
                    {user && user.isAdmin && (
                        <>
                            <Route path="/admin" element={<AdminDashboard />} />
                            <Route path="/product/:id/edit" element={<EditProductPage />} />
                        </>
                    )}
                    <Route path="/product/:id" element={<ProductPage />} />
                    <Route path="/category/:category" element={<CategoryPage />} />

                    <Route path="/new-product" element={<NewProduct />} />

                    <Route path="*" element={<Home />} />
              </Routes>
          </BrowserRouter>
      </div>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import summaryApi from "./common/index";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductsCount, setCartProductsCount] = useState(0);

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      // credentials: "include",
      headers: {
        "Content-Type": "application/json", // Specify content type if necessary
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the Authorization header with Bearer token
      },
    });

    const dataApi = await dataResponse.json();
    console.log("user details", dataApi.data);
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(summaryApi.addToCartProductCount.url, {
      method: summaryApi.addToCartProductCount.method,
      // credentials: "include",
      headers: {
        "Content-Type": "application/json", // Specify content type if necessary
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the Authorization header with Bearer token
      },
    });

    const dataApi = await dataResponse.json();
    setCartProductsCount(dataApi?.data?.count);
  };

  useEffect(() => {
    // Fetch user details
    fetchUserDetails();

    // user details cart product
    fetchUserAddToCart();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user-details fetch
          cartProductsCount, //current user cart product count
          fetchUserAddToCart,
        }}
      >
        <ToastContainer position="top-center" />
        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}
export default App;

import summaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, id) => {
  e?.stopPropagation();
  e?.preventDefault();

  const response = await fetch(summaryApi.addToCartProduct.url, {
    method: summaryApi.addToCartProduct.method,
    credentials: "include",
    headers: {
      "Content-Type": "application/json", // Specify content type if necessary
      Authorization: `Bearer ${localStorage.getItem("token")}`, // Add the Authorization header with Bearer token
    },
    body: JSON.stringify({ productId: id }),
  });
  const responseData = await response.json();

  if (responseData.success) {
    toast.success(responseData.message);
  }
  if (responseData.error) {
    toast.error(responseData.message);
  }

  return responseData;
};

export default addToCart;

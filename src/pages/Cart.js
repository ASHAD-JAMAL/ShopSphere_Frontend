import React, { useContext, useEffect, useState } from "react";
import summaryApi from "../common";
import Context from "../context";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context.cartProductsCount).fill(null);

  const fetchData = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.addToCartProductView.url, {
      method: summaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    setLoading(false);
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data----", data);
  
  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">Your Cart Is Empty</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between">
        {/* View Product  */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el) => {
                return (
                  <div
                    key={el + "Add To Cart Loading"}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "Add To Cart Loading"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                      />
                    </div>
                    <div>
                        <h2>{product?.productId?.productName}</h2>
                    </div>
                  </div>
                );
              })}
        </div>

        {/* summary */}
        <div className="mt-5 lg:mt-0 w-full max-w-sm">
          {loading ? (
            <div className="h-36 bg-slate-200 border-slate-300 animate-pulse"></div>
          ) : (
            <div className="h-36 bg-slate-200">Total</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

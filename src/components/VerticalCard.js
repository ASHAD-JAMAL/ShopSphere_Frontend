import React, { useContext } from "react";
import displayINRCurrency from "../helpers/displayCurrency";
import { Link } from "react-router-dom";
import Context from "../context";
import addToCart from "../helpers/addToCart";

const VerticalCard = ({ loading, data = [] }) => {
  const loadingList = new Array(13).fill(null);
  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] jusb md:gap-6 overflow-x-scroll scrollbarNone transition-all">
      {loading
        ? loadingList.map((product, index) => {
            return (
              <div className="w-full bg-white min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow">
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse"></div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black animate-pulse p-1  py-2 rounded-full bg-slate-200"></h2>
                  <p className="capitalize text-slate-500 animate-pulse p-1 rounded-full bg-slate-200 py-2"></p>
                  <div className="flex gap-3 w-full">
                    <p className="text-red-600 font-medium animate-pulse p-1 rounded-full bg-slate-200 py-2 w-full"></p>
                    <p className="text-slate-500 line-through animate-pulse p-1 rounded-full bg-slate-200 py-2 w-full"></p>
                  </div>
                  <button className="text-sm  text-white px-3 bg-slate-200 animate-pulse p-1 rounded-full py-2"></button>
                </div>
              </div>
            );
          })
        : data.map((product, index) => {
            return (
              <Link
                to={"/product/" + product?._id}
                className="w-full bg-white min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <div className="bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center">
                  <img
                    src={product?.productImage[0]}
                    className="h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply"
                  />
                </div>
                <div className="p-4 grid gap-3">
                  <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                    {product?.productName}
                  </h2>
                  <p className="capitalize text-slate-500">
                    {product?.category}
                  </p>
                  <div className="flex gap-3">
                    <p className="text-red-600 font-medium">
                      {displayINRCurrency(product?.sellingPrice)}
                    </p>
                    <p className="text-slate-500 line-through">
                      {displayINRCurrency(product?.price)}
                    </p>
                  </div>
                  <button
                    className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </Link>
            );
          })}
    </div>
  );
};

export default VerticalCard;
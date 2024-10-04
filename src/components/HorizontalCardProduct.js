import React, { useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProduct";
import displayINRCurrency from "../helpers/displayCurrency";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const [scroll, setScroll] = useState(0);
  const scrollElement = useRef();

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 600;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 600;
  };

  return (
    <div className="container  mx-auto px-4 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbarNone transition-all"
        ref={scrollElement}
      >
        <button
          className="bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block"
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className="bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block"
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {loading
          ? loadingList.map((product, index) => {
              return (
                <div className="w-full h-36 bg-white min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse"></div>
                  <div className="p-4 grid w-full gap-3">
                    <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full"></h2>
                    <p className="capitalize text-slate-500 bg-slate-200 animate-pulse p-1 rounded-full"></p>
                    <div className="flex gap-3 w-full">
                      <p className="text-red-600 font-medium bg-slate-200 w-full animate-pulse p-1 rounded-full"></p>
                      <p className="text-slate-500 line-through bg-slate-200 w-full animate-pulse p-1 rounded-full"></p>
                    </div>
                    <button className="text-sm text-white px-3 py-1 rounded-full bg-slate-200 animate-pulse"></button>
                  </div>
                </div>
              );
            })
          : data.map((product, index) => {
              return (
                <div className="w-full h-36 bg-white min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] rounded-sm shadow flex">
                  <div className="bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]">
                    <img
                      src={product?.productImage[0]}
                      className="h-full object-scale-down hover:scale-110 transition-all"
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
                    <button className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default HorizontalCardProduct;
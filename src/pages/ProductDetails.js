import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import summaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: "",
  });

  const params = useParams();
  const [loading, setLoading] = useState(true);
  const productImageListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({
    x: 0,
    y: 0,
  });

  const [zoomImage, setZoomImage] = useState(false);
  console.log("product id", params);

  const fetchProductDetails = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.productDetails.url, {
      method: summaryApi.productDetails.method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        productId: params?.id,
      }),
    });
    setLoading(false);
    const dataResponse = await response.json();
    setData(dataResponse?.data);
    setActiveImage(dataResponse?.data?.productImage[0]);
  };
  console.log("data aa rha hai active product ka", data);

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL);
  };

  const handleZoomImage = useCallback(
    (e) => {
      setZoomImage(true);
      const { left, top, width, height } = e.target.getBoundingClientRect();
      console.log("coordinate", left, top, width, height);

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setZoomImageCoordinate({ x, y });
    },
    [setZoomImageCoordinate]
  );

  const handleLeaveImageZoom = () => {
    setZoomImage(false);
  };
  return (
    <div className="container mx-auto p-4">
      {/* product image  */}
      <div className="min-h-[200px] flex flex-col lg:flex-row gap-4">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {/* main image  */}
          <div className="h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2">
            <img
              src={activeImage}
              className="h-full w-full object-scale-down mix-blend-multiply"
              onMouseMove={handleZoomImage}
              onMouseLeave={handleLeaveImageZoom}
            />

            {/* product zoom  */}
            {zoomImage && (
              <div className="hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0">
                <div
                  className="w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-125"
                  style={{
                    backgroundImage: `url(${activeImage})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: `${zoomImageCoordinate.x * 100}% ${
                      zoomImageCoordinate.y * 100
                    }%`,
                  }}
                ></div>
              </div>
            )}
          </div>
          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbarNone h-full">
                {productImageListLoading.map((el) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-300 rounded animate-pulse"
                      key={"loadingImage"}
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col overflow-scroll scrollbarNone h-full">
                {data?.productImage.map((imgURL, index) => {
                  return (
                    <div
                      className="h-20 w-20 bg-slate-200 rounded p-1"
                      key={imgURL}
                    >
                      <img
                        src={imgURL}
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* product details  */}
        {loading ? (
          <div className="grid gap-1 w-3/12">
            <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block"></p>
            <h2 className="text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 lg:h-8 w-full"></h2>
            <p className="capitalize text-slate-400 bg-slate-200 animate-pulse h-6 lg:h-8 w-full"></p>

            {/* rating  */}
            <div className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full flex items-center gap-1"></div>

            {/* price  */}
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full"></p>
              <p className="bg-slate-200 animate-pulse h-6 lg:h-8 w-full line-through"></p>
            </div>

            {/* button  */}
            <div className="flex items-center gap-3 my-2">
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></button>
              <button className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></button>
            </div>

            {/* description  */}
            <div>
              <p className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></p>
              <p className="h-6 lg:h-8 bg-slate-200 rounded animate-pulse"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-medium">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>

            {/* rating  */}
            <div className="text-red-600 flex items-center gap-1">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>

            {/* price  */}
            <div className="flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1">
              <p className="text-red-600">
                {displayINRCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayINRCurrency(data?.price)}
              </p>
            </div>

            {/* button  */}
            <div className="flex items-center gap-3 my-2">
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-red-600 font-medium hover:bg-red-600 hover:text-white transition-colors duration-300">
                Buy
              </button>
              <button className="border-2 border-red-600 rounded px-3 py-1 min-w-[120px] text-white bg-red-600 hover:text-red-600 hover:bg-white transition-colors duration-300">
                Add To Cart
              </button>
            </div>

            {/* description  */}
            <div>
              <p>Description : </p>
              <p>{data?.description}</p>
            </div>
          </div>
        )}
      </div>
      {data.category && (
        <CategoryWiseProductDisplay
          category={data?.category}
          heading={"Recommended Products"}
        />
      )}
    </div>
  );
};

export default ProductDetails;

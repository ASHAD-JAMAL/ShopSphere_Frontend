import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import summaryApi from "../common";
import VerticalCard from "../components/VerticalCard";

const SearchProduct = () => {
  const query = useLocation();
  const [data, setDate] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await fetch(summaryApi.searchProduct.url+query.search);
    const dataResponse = await response.json();
    setLoading(false);
    setDate(dataResponse.data);
  };
  useEffect(() => {
    fetchProducts();
  }, [query]);
  console.log("data------->", data);
  return (
    <div className="container mx-auto p-4">
      {loading && <p className="text-lg text-center">Loading...</p>}
      <p className="text-lg font-semibold my-3">Search Results : {data.length}</p>
      {data.length === 0 && !loading && (
        <p className="bg-white text-lg text-center p-4">No products found</p>
      )}
      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;

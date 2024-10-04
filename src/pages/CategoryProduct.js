import React from 'react'
import { useParams } from 'react-router-dom'

const CategoryProduct = () => {
    const params = useParams();
    // console.log("params is",params)
    // useParams() ka use karke tum URL ke dynamic part ko easily access kar sakte ho.
    // http://localhost:3000/product-category/camera

  return (
    <div>
        {params?.categoryName}
    </div>
  )
}

export default CategoryProduct
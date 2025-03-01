import React, { useContext, useEffect, useState } from 'react';
import styles from './Products.module.css';
import axios from 'axios';
import { useQuery } from 'react-query';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

function Products() {
  let { AddToWishList } = useContext(WishListContext);
  let { addToCart } = useContext(CartContext);

  let [favoriteProducts, setFavoriteProducts] = useState({});

  async function AddKobriWishlist(id) {
    let x = await AddToWishList(id);
    if (x === 1) {
      setFavoriteProducts((prev) => ({
        ...prev,
        [id]: true,
      }));
      toast.success("Added to favourite Successfully", { position: "top-left" });
    } else {
      setFavoriteProducts((prev) => ({
        ...prev,
        [id]: false,
      }));
      toast.error("Not added to favourite", { position: "top-left" });
    }
  }

  async function addToCartKobri(id) {
    let x = await addToCart(id);
    if (x === 1) {
      toast.success("Product is added Successfully", { position: "top-center" });
    } else {
      toast.error("Product not added to cart");
    }
  }

  function getRecent() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ["recentProduct"],
    queryFn: getRecent,
  });

  if (isLoading) {
    return (
      <div className="container w-full mx-auto mt-11">
        <ClipLoader color="green" aria-label="Loading Spinner" size={200} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
      {data?.data?.data.map((product) => (
        <div key={product._id} className="mb-10">
          <div className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Link to={`ProductDetails/${product._id}/${product.category.name}`}>
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <p className="text-emerald-700 text-lg font-semibold truncate">
                  {product.title.split(" ").slice(0, 2).join(" ")}
                </p>
                <p className="text-sm text-gray-500">{product.category.name}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-slate-500 text-lg font-bold">{product.price} EGP</span>
                  <span className="flex items-center text-yellow-400">
                    <i className="fas fa-star"></i>
                    {product.ratingsQuantity}
                  </span>
                </div>
              </div>
            </Link>
            {/* زر المفضلة مع تحديث للحالة الخاصة بكل منتج فقط */}
            <div className="group cursor-pointer" onClick={() => AddKobriWishlist(product._id)}>
              <i
                className={`fa-heart ${
                  favoriteProducts[product._id] ? "fa-solid text-red-600" : "fa-regular"
                } text-2xl`}
              ></i>
            </div>
            <button
              onClick={() => addToCartKobri(product._id)}
              className="bottom-4 left-1/2 bg-emerald-700 text-white px-6 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Add To Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Products;

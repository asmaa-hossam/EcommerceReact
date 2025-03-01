import React, { useContext, useEffect, useState } from 'react';
import styles from './ProductDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Context/WishListContext';

function ProductDetails() {
let [product,setProduct]=useState(null)
let [related,setRelated]=useState(null)
let[isfavourite,setIsfavourite]=useState(false)
  let{AddToWishList}=useContext(WishListContext);

let{id,category}=useParams()
let {addToCart}=useContext(CartContext)
 
async function AddKobriWishlist(id){
  let x= await AddToWishList(id);
  if(x===1){
    setIsfavourite(true)
   toast.success(' added to favourite Succesfuly',{position:'top-left'})
  }
  else{
    setIsfavourite(false)
   toast.error(" not added to favourite",{position:'top-left'})
 }
}

async function kobriAddcart(proid){
  let x= await addToCart(proid)
  if(x===1){

    toast.success('product is added Succesfuly',{position:'top-center'})
    }
    else{
      toast.error("product not added to cart")
    }
}
  function getSpesificProduct(proId){
   axios.get(`https://ecommerce.routemisr.com/api/v1/products/${proId}`)
   .then(({data})=>{
    setProduct(data.data)
    console.log(data.data)
   })
  }
  function getRelatedProduct(category){
    axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .then(({data})=>{
let x=data.data;
 let y= x.filter((item)=>item.category.name===category)
 
 setRelated(y)
    })
  }
  useEffect(()=>{
getSpesificProduct(id)
getRelatedProduct(category)
  },[id,category])
 
  return ( <>
 <div className='container w-[80%] mt-10 mx-auto bg-slate-100 p-6 rounded-lg shadow-lg'>
  {product ? (
    <div className='flex flex-col md:flex-row items-center gap-6'>
      {/* صورة المنتج */}
      <div className='w-full md:w-1/3'>
        <img 
          src={product.imageCover} 
          alt={product.title}  
          className='w-full rounded-lg shadow-md'
        />
      </div>
      {/* تفاصيل المنتج */}
      <div className='w-full md:w-2/3 p-6 text-center md:text-start'>
        <p className='text-emerald-700 text-lg font-semibold'>{product.description}</p>
        <p className='text-gray-500 text-md mt-2'>{product.title}</p>
        <p className='text-gray-600 mt-1 font-medium'>{product.category.name}</p>
        <div className='flex justify-between items-center'>
        <button 
          type="button" 
          onClick={() => kobriAddcart(product._id)}  
          className="bg-emerald-700 text-white px-6 py-3 mt-6 w-full md:w-auto rounded-lg hover:bg-emerald-800 transition duration-300"
        >
          Add To Cart
        </button>
        <div className='' onClick={()=>AddKobriWishlist(product._id)}> <i className={`fa-heart ${isfavourite ? "fa-solid text-red-600" : "fa-regular"}`}></i>
        </div>

        </div>

      </div>
    </div>
  ) : (
    <div className="w-full text-center mt-11">
      <ClipLoader color='green' size={80} />
    </div>
  )}
</div>

{/* المنتجات ذات الصلة */}
<div className="container mt-10">
  <div className='mx-auto text-center mb-6'>
    <h1 className='text-2xl font-bold text-gray-800 border-b-2 border-emerald-500 inline-block pb-1'>Related Products</h1>
  </div>
  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
    {related?.map((product) => (
      <div key={product._id} className='bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300'>
        <div className='relative overflow-hidden'>
          <Link to={`/ProductDetails/${product._id}/${product.category.name}`}>
            <img 
              src={product.imageCover} 
              alt={product.title} 
              className='w-full h-56 object-cover rounded-md'
            />
            <p className='text-emerald-700 text-lg font-semibold mt-3'>{product.title.split(" ").slice(0, 2).join(" ")}</p>
            <p className='text-gray-500 text-sm'>{product.category.name}</p>
            <div className='flex justify-between items-center mt-2'>
              <span className='text-gray-700 font-bold'>{product.price} EGP</span>
              <span className='flex items-center text-yellow-400'>
                <i className="fas fa-star"></i> {product.ratingsQuantity}
              </span>
            </div>
          </Link>
        </div>
      </div>
    ))}
  </div>
</div>



  </> );
}

export default ProductDetails;
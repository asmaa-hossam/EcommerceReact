import React, { useContext } from 'react';
import styles from './Cart.module.css';
import { CartContext } from '../../Context/CartContext';
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function Cart() {
  let {getAllProducts,numOfCarItem,totalCartPrice,updateUserCart,removeSpesificItem,clearCart}=useContext(CartContext);
  async function handleUbdate(sectionId,newCount){
    await updateUserCart(sectionId,newCount)
 }
 function handleRemove(sectionId){
       removeSpesificItem(sectionId)
       toast.success("item removed successfuly")
 }
function handleClear(){
  clearCart()
  toast.success("cart is empty now")

}

// if(!getAllProducts){
//   return <div className="container w-full mx-auto mt-11">
//   <span><ClipLoader
//         color='green'
//         aria-label="Loading Spinner"
//         data-testid="loader"
//         size={200}
//       /></span>
//       </div>
// }
  return ( <>

<div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-6">
 <div className=' border border-stone-700 p-1 w-40 mx-auto mb-3 mt-3'> <h1 className='text-center text-slate-700 '>TotalPrice:{totalCartPrice}</h1></div>
 <div className=' border border-stone-700 p-1 w-40 mx-auto'><p  className='text-center text-slate-700 '>{numOfCarItem} diffrent Items</p></div>
 <div className='flex justify-end  w-full p-3 -ms-20'>
  <button 
   onClick={()=>handleClear()}
    className='bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300'
  >
    Clear Cart
  </button>
</div>
  <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
    {getAllProducts?.map((product)=><tr key={product._id}  className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button disabled={product.count===0} onClick={()=>handleUbdate(product.product._id,product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <input type="number" id="first_product" className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={product.count} required />
            </div>
            <button onClick={()=>handleUbdate(product.product._id,product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
         {product.price}
        </td>
        <td className="px-6 py-4">
          <a onClick={()=>handleRemove(product.product._id)} href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
        </td>
      </tr>)}
     
     
    </tbody>
  </table>
  <Link to='/Payment'>
  <button className='btnn'>Puy your Product</button>

  </Link>
</div>


  </> );
}

export default Cart;
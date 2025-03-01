import { useContext, useEffect, useState } from "react";
import { WishListContext } from "../../Context/WishListContext";
import ClipLoader from "react-spinners/ClipLoader";
import { Link } from "react-router-dom";


function WishList() {
let [product,setproduct]=useState(null)
  let{getwhisglist}=useContext(WishListContext);
 async function kobrigetwhish(){
    let x= await getwhisglist()
    setproduct(x.data.data)
  }
  useEffect(()=>{
kobrigetwhish()
  },[])
  return ( <>
  <div className="grid grid-cols-1 gap-6">
  {product?.map((product) => (
    <div key={product._id} className="mb-6">
      <div className="group flex items-center bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
        {/* صورة المنتج */}
        <Link to={`ProductDetails/${product._id}/${product.category.name}`} className="w-1/3">
          <img
            src={product.imageCover}
            alt={product.title}
            className="w-full h-40 object-cover rounded-l-lg"
          />
        </Link>

        {/* تفاصيل المنتج */}
        <div className="w-2/3 p-4">
          <Link to={`ProductDetails/${product._id}/${product.category.name}`}>
            <p className="text-emerald-700 text-lg font-semibold">
              {product.title.split(" ").slice(0, 2).join(" ")}
            </p>
            <p className="text-sm text-gray-500">{product.description}</p>
            <div className="flex justify-between items-center mt-2">
              <span className="text-slate-500 text-lg font-bold">{product.price} EGP</span>
              <span className="flex items-center text-yellow-400">
                <i className="fas fa-star"></i> {product.ratingsQuantity}
              </span>
            </div>
          </Link>

          
            <button
              className="bg-emerald-700 text-white px-4 py-2 rounded-lg hover:bg-emerald-800 transition duration-300"
            >
              remove from whishlist
            </button>
        </div>
      </div>
    </div>
  ))}
</div>
</>

  )}
 

export default WishList;
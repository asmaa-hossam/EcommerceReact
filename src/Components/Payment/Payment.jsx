import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

 
 function Payment() {
let {cartId,UbdateUi}=useContext(CartContext)
let [isOnline,setIsOnline]=useState(false)
function detectOnline(values){
    if(isOnline){
        OnlineOrder(values)
    }
    else{
        CashOrder(values)
    }
}

    function CashOrder(values){
        let bakendrequest={
            shippingAddress:values
        }
       axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,bakendrequest,
        {headers:
            {token:localStorage.getItem('tkn')}}
        )
    .then((res)=>{
        UbdateUi()
        toast.success('success cash order')
    })
    .catch((err)=>{
        console.log(err)
    })
    }

    function OnlineOrder(values){
        let bakendrequest={
            shippingAddress:values
        }
       axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?http://localhost:5173`,bakendrequest,
        {headers:
            {token:localStorage.getItem('tkn')},params:{url:'http://localhost:5173'}}
        )
    .then((res)=>{
      window.open(res.data.session.url,'_self')
    })
    .catch((err)=>{
        console.log(err)
    })
    }
    
let formik=useFormik({
    initialValues:{
        details: "",
        phone: "",
        city: ""
    },
    onSubmit:detectOnline,
})

    return ( <>
    <div className="container mx-auto">

    <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  
  
  <div className="mb-5 text-left mt-7">
    <label htmlFor="details" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your details</label>
    <input type="text" name='details' id="details" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="enter your details" />
  </div>
  
  <div className="mb-5 text-left">
    <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your phone</label>
    <input type="tel" name='phone' id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="enter your phone" />
  </div>

  <div className="mb-5 text-left">
    <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your city</label>
    <input type="text" id="city" name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
  </div>

 <button onClick={()=>setIsOnline(false)}  type="submit" className= "text-white  bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cash Order</button>
 <button  onClick={()=>setIsOnline(true)}  type="submit" className= "text-white ms-5 bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">online Order</button>


</form>

    </div>
    </> );
 }
 
 export default Payment;
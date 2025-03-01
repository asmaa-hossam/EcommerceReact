import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";

function AllOrders() {

let[orders,setorders]=useState(null)

function getUserOrder(){

    axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/67a4c922518151d803d49ebe`)
    .then((res)=>{
    setorders(res.data)
    console.log(res.data)
    })
    .catch((err)=>{

    })
}
useEffect(()=>{
getUserOrder()
},[])
    return ( <>

    <div className="container mx-auto mt-8">
        <h1 className="fs-2 my-3"> UserOrder</h1>
 <div className='grid grid-cols-4 gap-2'>
{orders?.map((item)=><div key={item._id} className='border p-2 border-yellow-200 shadow-sm '>
<p className="text-gray-600">Name: {item.user.name}</p>
<p className="text-gray-600">Email: {item.user.email}</p>
<p className="text-gray-600">Phone: {item.user.phone}</p>
<p className="text-gray-600">PaidAt: {item.paidAt}</p>

</div>)}
 </div>
    </div>
    </> );
}

export default AllOrders;
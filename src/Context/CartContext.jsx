import axios from "axios";
import { createContext, useEffect, useState } from "react";

 export let CartContext=createContext();
 let headers={
    token:localStorage.getItem('tkn')
}
function CartContextProvider(props) {
 let [getAllProducts,setAllProdut]=useState(null);
 let [numOfCarItem,setnumOfCartItem]=useState(0);
 let[totalCartPrice,settotalCartPrice]=useState(0);
 let[cartId,setCartId]=useState(null)
 let [cartOwner,setCartOwner]=useState(null)
 function UbdateUi(){
    setAllProdut(null)
    setnumOfCartItem(0)
    settotalCartPrice(0)
    setCartId(null)
 }
  async function addToCart(productId){
   return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        {productId},
        {headers}
    )
    .then((res)=>{
      getUserCart();
        return 1
    })
    .catch((err)=>{
        return 0;
    })
 }


 function getUserCart(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
     {headers})
     .then((res)=>{
        setAllProdut(res.data.data.products)
        setnumOfCartItem(res.data.numOfCartItems)
        settotalCartPrice(res.data.data.totalCartPrice)
        setCartId(res.data.data._id)
        setCartOwner(res.data.data.cartOwner)
        console.log(res.data.data.cartOwner)

    })
    .catch((err)=>{
       console.log(err)
    })
 }
 function updateUserCart(sectionId,newCount){
    axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${sectionId}`,
        {count:newCount},
        {headers}
    )
    .then((res)=>{
        setAllProdut(res.data.data.products)
        setnumOfCartItem(res.data.numOfCartItems)
        settotalCartPrice(res.data.data.totalCartPrice)
    })
    .catch((err)=>err)
 }
 function removeSpesificItem(sectionId){
    axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${sectionId}`,{headers})
    .then((res)=>{
        setAllProdut(res.data.data.products)
        setnumOfCartItem(res.data.numOfCartItems)
        settotalCartPrice(res.data.data.totalCartPrice)
    }).catch((err)=>err)
 }
 function clearCart(){
   axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
   .then((res)=>{
      UbdateUi()
      setAllProdut(res.data.data.products)
        setnumOfCartItem(res.data.numOfCartItems)
        settotalCartPrice(res.data.data.totalCartPrice)
       
    }).catch((err)=>err)
   
 }

 useEffect(()=>{
getUserCart()
 },[])
    return ( <CartContext.Provider value={{addToCart,getUserCart,getAllProducts,numOfCarItem,totalCartPrice,updateUserCart
        ,removeSpesificItem,cartId,UbdateUi,cartOwner,clearCart
    }}>
       {props.children}
    </CartContext.Provider> );
}

export default CartContextProvider;
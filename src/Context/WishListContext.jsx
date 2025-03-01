import axios from "axios";
import { createContext, useEffect, useState } from "react";

let headers={
    token:localStorage.getItem('tkn')
}
 export let WishListContext=createContext();
export default function WishListContextProvider(props){

     async function AddToWishList(productId){
       return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            {productId},{headers}
        ).then((res)=>{
            console.log(res)
            return 1;
        })
        .catch((err)=>{
            console.log(err)
            return 0;
        })}

       async function getwhisglist(){
           return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
            .then((res)=>{
                   
                return res
            })
            .catch((err)=>{
                return err
            })
        }
        

    return <WishListContext.Provider value={{AddToWishList,getwhisglist}}>

       {props.children}
    </WishListContext.Provider>
 }
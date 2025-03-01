import React, { useContext, useState } from 'react';
import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

function Login() {
 let {settoken} =useContext(AuthContext)
   let {getUserCart}=useContext(CartContext)
    let navigate=  useNavigate()
  let[errr,seterrr]=useState(null)
  let [loading,setLoding]=useState(false)
  let validationSchema=yup.object({
    email:yup.string().email('this is unValid email').required('this fiekd is required'),
    password:yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/,'password is not correct').required('this fiekd is required'),
  })
  
  
   let formik=useFormik({
    initialValues:{
    email:'',
    password:'',
    },
    validationSchema,
    onSubmit:submitRegister
   })
   function submitRegister(values){
    setLoding(true)
     axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`,values)
    .then((res)=>{
     if(res.data.message==='success'){
      setLoding(false)
  localStorage.setItem("tkn",res.data.token)
  settoken(res.data.token)
getUserCart()
       navigate('/')
       
     }
  
    })
    .catch((err)=>{
      setLoding(false)
  
     seterrr(err.response.data.message);
     console.log(err)
    })
   }
    return (  <>
    <div className='p-6'>
  {errr?<>
      <div className="flex  text-center items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium text-center">{errr}</span> 
    </div>
   
  </div>  </>:""}
  
  
  <form className="max-w-sm mx-auto" onSubmit={formik.handleSubmit}>
  
  
    <div className="mb-5 text-left">
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
      <input type="email" name='email' id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" placeholder="enter your phone" />
    </div>
    {formik.errors.email&&formik.touched.email?<>
      <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">{formik.errors.email}</span> 
    </div>
  </div>
    </>:""
   
  }
  
    <div className="mb-5 text-left">
      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
      <input type="password" id="password" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light" />
    </div>
  
    {formik.errors.password&&formik.touched.password?<>
      <div className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
    </svg>
    <span className="sr-only">Info</span>
    <div>
      <span className="font-medium">{formik.errors.password}</span> 
    </div>
  </div>
    </>:""
   
}

<div className="flex items-start mb-5">
  <p className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">already have an account <a href="/Login" className="text-blue-600 hover:underline dark:text-blue-500">Login</a></p>
</div>
{loading?   <button className= "text-white -ms-60 bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register
  <span><ClipLoader
      color='green'
      loading={loading}
      size={50}
      aria-label="Loading Spinner"
      data-testid="loader"
    /></span>
</button>:  <button disabled={!(formik.dirty&&formik.isValid)} type="submit" className= "text-white -ms-60 bg-blue-700  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>

}
</form>

</div>

</>);
}

export default Login;
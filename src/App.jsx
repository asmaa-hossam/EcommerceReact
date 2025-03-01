
import {  createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css'
import './index.css'
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Products from './Components/Products/Products';
import Cart from './Components/Cart/Cart';
import Notfound from './Components/Notfound/Notfound';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import AuthContextProvider from './Context/AuthContext';
import ProtectedRout from './Components/ProtectedRout/ProtectedRout';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/allorders/allorders';
import WishListContextProvider from './Context/WishListContext';
import WishList from './Components/Wishlist/Wishlist';
let x=new QueryClient();
function App() {
let router=createBrowserRouter([{path:"",element: <Layout/>,children:[
  {index:true ,element:<ProtectedRout><Home/></ProtectedRout>},
  {path:"products",element: <ProtectedRout><Products/></ProtectedRout>},
  {path:"cart",element:<ProtectedRout><Cart/></ProtectedRout>},
  {path:"payment",element:<ProtectedRout><Payment/></ProtectedRout>},
   {path:'allorders', element:<AllOrders/>},
   {path:'wishlist', element:<WishList/>},

  {path:"ProductDetails/:id/:category",element:<ProtectedRout><ProductDetails/></ProtectedRout>},

  {path:"login",element:<Login/>},
  {path:"register",element:<Register/>},

  {path:"*",element:<Notfound/>},
]}])
  


  return ( <>
   <WishListContextProvider>
  <CartContextProvider>
   
  <QueryClientProvider client={x}>
  <AuthContextProvider>
  <RouterProvider router={router}></RouterProvider>
<Toaster></Toaster>
  </AuthContextProvider>

  </QueryClientProvider>
  </CartContextProvider>
  </WishListContextProvider>



  </> );
}

export default App;
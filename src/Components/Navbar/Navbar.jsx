import React, { useContext } from 'react';
import styles from './Navbar.module.css';
import { Link, NavLink, useNavigate} from 'react-router-dom';
import logo from '../../assets/images/images/freshcart-logo.svg'
import { AuthContext } from '../../Context/AuthContext';
import { CartContext } from '../../Context/CartContext';

function Navbar() {
let {token,settoken} = useContext(AuthContext)
let{numOfCarItem}=useContext(CartContext)
let navigate=useNavigate()
function logout(){
  localStorage.removeItem('tkn');
settoken(null);
navigate('/Login')
}
  return ( <>
  <div className='w-full bg-slate-200 fixed top-0 left-0 z-30'>
<div className="container mx-auto flex justify-between items-center p-3  ">
 <div className='flex  space-x-2' >
  <img src={logo} alt="freshCart" />
  <ul className='flex gap-x-4 items-center '>
    {token?<> <li>
    <NavLink className=' text-black' to='/'>home</NavLink>
    </li> 
   <li>
    <NavLink className=' text-black '  to='Products'>products</NavLink>
    </li> 
    <li>
    <NavLink className=' text-black '  to='wishlist'>wishlist</NavLink>
    </li> 
    <li>
    <NavLink className=' text-black ' to='Cart'><i className=" relative fa-solid fa-cart-shopping"><small className='  absolute top-0'>{numOfCarItem}</small></i></NavLink>
    </li> 
    
   </>:""}
 
  </ul>
 </div>

<div className='flex space-x-2 items-center'>
  <ul className='flex gap-x-3 cursor-pointer'>
<li >
  <i className='fa-brands fa-facebook-f'></i>
</li>
<li >
  <i className='fa-brands fa-twitter'></i>
</li>
<li >
  <i className='fa-brands fa-instagram'></i>
</li>
<li >
  <i className='fa-brands fa-linkedin'></i>
</li>
</ul>

<ul className=' flex gap-x-2 items-center'>
{token? <ul>
  <span onClick={()=>logout()} >Logout</span>
 </ul>:<li>
  <NavLink className=' text-black ' to='Login'>login</NavLink>
  <NavLink  className=' text-black ms-2' to='Register'>register</NavLink>

</li>}


</ul>
 

</div>

</div>
</div>
  </> );
}

export default Navbar;

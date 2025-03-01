import React from 'react';
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

function Layout() {
  return ( <>
  <Navbar/>
  <Outlet></Outlet>
  <Footer/>
  </> );
}

export default Layout;

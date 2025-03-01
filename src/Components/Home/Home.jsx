import React, { useEffect, useState } from 'react';
import styles from './Home.module.css';
import axios from 'axios';
import Products from '../Products/Products';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';

function Home() {

  return (<>
  
<SimpleSlider/>
<CategorySlider/>
  <Products/>
  </>);
}

export default Home;

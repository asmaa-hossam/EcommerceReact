import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import { useEffect, useState } from "react";
function CategorySlider() {
   let[category,setCategory] =useState(null)
 async function getCategory(){
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then((res)=>{
        setCategory(res.data.data)
    })
    .catch((err)=>{console.log(err)})
 }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 3,
      };
      useEffect(()=>{
getCategory()
      },[])
      return (
        <div>
        <Slider {...settings}>
            {category?.map((category)=> <div key={category._id}>
           <img src={category.image} alt={category.name} className=' w-full h-[120px]' />
          </div> )}
         
        </Slider>
        </div>
      );
}

export default CategorySlider;
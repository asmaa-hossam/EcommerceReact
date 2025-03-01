import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from '../../assets/images/images/slider-image-1.jpeg'
import img2 from '../../assets/images/images/slider-image-2.jpeg'
import img3 from '../../assets/images/images/slider-image-3.jpeg'
import img4 from '../../assets/images/images/grocery-banner-2.jpeg'
import img5 from '../../assets/images/images/grocery-banner.png'

export default function SimpleSlider() {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  return (
    <div className="flex mt-4 mb-4 justify-center ">
      <div className="w-[75%] "> 
      <Slider {...settings} >
    <div>
       <img src={img1} alt="" className="w-full h-80 " />
      </div>
      <div>
      <img src={img2} alt="" className="w-full h-80 " />    
        </div>
      <div>
      <img src={img3} alt="" className="w-full h-80 "  />
      </div>
      
    </Slider>
      </div>
      <div className="w-[25%] ">
      <div>
      <img src={img4} alt=""className="w-full h-40 "  />
      </div>
      <div>
      <img src={img5} alt="" className="w-full h-40 "  />
      </div>
    </div>
    </div>
  );
}


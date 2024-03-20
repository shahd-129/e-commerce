import axios from 'axios'
import React, { useEffect, useState } from 'react';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function CategorySlider() {

let [slider , setSlider] = useState()

  async function getAllCategory() {
    let {data}= await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    setSlider(data.data)
  //  console.log(data);
  }
useEffect(()=>{
  getAllCategory()
})
  return (
    <div className='my-5'>
     <OwlCarousel items={5} className='owl-theme'>
     {slider?.map((el)=>{
            return <div key={el._id} className='item'>
            <img src={el.image} className='w-100' height={250}  alt="" />
            <p className="text-main text-center" >{el.name} </p>
            </div>
          })}  
     </OwlCarousel>
    </div>
  )
  }

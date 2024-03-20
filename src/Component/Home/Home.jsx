import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { CartContext } from '../Context/cartContext';
import MainSlider from '../MainSlider/MainSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
export default function Home() {
 let {addCart , setnumItem}= useContext(CartContext)
  let [loading , setLoading] = useState(true)
  let [product , setProduct] = useState([])
 
  async function getProducts(){
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/products") 
    // console.log(req.data.data); 
    setLoading(false)
    setProduct(data.data)
  }

useEffect(()=>{
  getProducts()
  },[])

async function addToCart(id){
  let req = await addCart(id)
  if(req.data.status === 'success'){
      setnumItem(req.data.numOfCartItems)
      toast.success('Successfully created!');
  }
}

  return (
  <>
  <Helmet>
    <meta charSet="utf-8" name='description' content='Home' />
     <title>Home</title>
  </Helmet>
 <Toaster/>
  {loading? <Loading></Loading>: <div className="container py-5 m-5">
  <MainSlider></MainSlider>
  <CategorySlider/>
     <div className='row g-4'>
      {product?.map((el)=> {
        return  <div key={el.id} className="col-md-3">
         <div className="product w-100 cursor-pointer py-4">
         <Link to={"/productdetails/" +el.id}>
         <img className='w-100' src={el?.imageCover} alt=''/>
        <h5 className='text-main'>{el.category.name}</h5>
         <h4 className='h6'>{el.title}</h4>
         <div className='d-flex justify-content-between'>
           <span>{el.price}EGp</span>
           <span><i className="fa-solid fa-star rating-color"></i>{el.ratingsAverage}</span>
           </div>     
             </Link>
             <div className="d-flex justify-content-between">
             <button onClick={()=> addToCart(el.id)} className='btn bg-main my-2 text-white w-75 d-block text-center'>+Add</button>
             <span><i className="fa-solid fa-heart xl"></i></span>
             </div>
         </div>
        </div>
      })}
     </div>
    </div>}
   
  </>
    
  )
}

import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { CartContext } from '../Context/cartContext';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';

export default function ProductDetailes() {
  
 let {addCart , setnumItem} = useContext(CartContext)
 let [dataDetails , setdataDetails] = useState()
 let [loading , setLoading] = useState(true)
 let data = useParams()

async function getDetails(id){
  let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  setLoading(false)
  setdataDetails(data?.data)
  // console.log(data?.data);

}
useEffect(()=>{
  getDetails(data.id)
} , [])


async function addToCart(id){
  let req = await addCart(id)
  
if(req.data.statue === "success") {
 
 setnumItem(req.data.numOfCartItems)
 toast.success('Successfully created!');


}
// console.log(req);
}



 return (<>
<Helmet>
        <meta charSet="utf-8" name='description' content={dataDetails?.title} />
          <title>{dataDetails?.title}</title>
            </Helmet>

  <Toaster/>
  {loading? <Loading></Loading>:
   <div className='container'> 
   <div className="row py-5 align-items-center">
       <div className="col-md-4">
           <img className='w-100' src={dataDetails?.imageCover} alt=''/>
       </div>
       <div className="col-md-8 ">
           <h2>{dataDetails?.title}</h2>
           <p>{dataDetails?.description}</p>
           <div className="d-flex justify-content-between">
           <span>{dataDetails?.price}EGp</span>
           <span><i className="fa-solid fa-star rating-color"></i>{dataDetails?.ratingsAverage}</span>
           </div>
           <div className="d-flex justify-content-between">
           <button onClick={()=>{addToCart(dataDetails?.id)}} className='btn bg-main my-3 text-white w-75 d-block text-center'>+Add</button>
           <span><i className="fa-solid fa-heart xl"></i></span>
           </div>
          
       </div>
   </div>
 </div>
  }
 
  
  
  </>
  )
}

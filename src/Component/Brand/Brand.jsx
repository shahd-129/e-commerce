import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react';
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
export default function Brand() {
  let [loading , setLoading] = useState(true)
let[brand , setBrand] = useState([])
 async function getBrand() {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
   setLoading(false)
    setBrand(data.data)
  }
  
  useEffect(()=>{
    getBrand()
  })
  return (<>


<Helmet>
        <meta charSet="utf-8" name='description' content="Brand" />
          <title>Brand</title>
            </Helmet>


  {loading ? <Loading></Loading> :  <div className="container">
    <h2 className='text-main text-center p-3'>All Brands</h2>
    <div className="row g-5 m-2">
      {brand.map((el)=>{
        return <div key={el._id} className="col-md-3 border border-1 cursor-pointer p-3 rounded-2">
        <img className='w-100' src={el.image} alt=''  data-bs-toggle="modal" data-bs-target=  { `#${el.name}`}/>
        <p className='text-center'>{el.name}</p>
      
<div className="modal fade" id={el.name} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body d-flex justify-content-between">
       <h2 className='text-main'>{el.name}</h2>
       <p>{el.slug}</p>
        <img src={el.image} alt=''/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
      </div>
      
      })}
    </div>
  </div>
   }
 
  
  
  </>
  )
}

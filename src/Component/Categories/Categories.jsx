import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../Loading/Loading';
import { Helmet } from 'react-helmet';
export default function Categories() {
  
  let [loading , setLoading] = useState(true)  
  let [categories , setCategorise] = useState([])
   
  async function getCategories() {
    let {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
    // console.log(req.data.data);
    setLoading(false) 
    setCategorise(data.data)
  }

  useEffect(()=>{
    getCategories()
  })
  return (<>


<Helmet>
  <meta charSet="utf-8" name='description' content="Categories" />
   <title>Categories</title>
</Helmet>


  {loading ? <Loading></Loading>  :  <div className='container py-5 mt-5'>
      <div className="row g-4">
     {categories.map((el)=>{
        return  <div key={el._id} className="col-md-4">
          <div className="cart">
          <div className="product w-100  py-4 cursor-pointer  border border-1">
        <img className='w-100' src={el.image} alt=''></img>
            <h2 className='text-main text-center my-2'>{el.name}</h2>
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

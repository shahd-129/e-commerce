
import React, { useContext} from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { useParams } from 'react-router-dom';
import { CartContext } from '../Context/cartContext';

export default function CheckOut() {
  
let{checkOutPayment} =   useContext(CartContext)
let data  = useParams()

// // Validation By Yup 
 let validation = Yup.object({
  phone:Yup.string().matches(/^01[0152][0-9]{8}$/ , "phone is invalid").required("phone is required"),
  city: Yup.string().required("city Required").matches(/^[\w-]{3,}$/, "enter valid city"),
  details: Yup.string().required("details Required").matches(/^[\w-]{3,}$/, "enter valid details"),
 })

  let formik = useFormik({
    initialValues:{
        details: "", 
        phone: "",
        city : ""
    }, validationSchema:validation,
    onSubmit: checkOutSubmit
  })


  async function checkOutSubmit(value) {
    let req= await checkOutPayment( data.id, value)
     if(req.data.status === "success"){
      window.location.href =req.data.session.url
     }
    //  console.log(req);
    }

    return (<>
    <div className='w-75 py-5 m-5 mx-auto'>
 

    <form onSubmit={formik.handleSubmit}>
  
         <label htmlFor='details'>Details:</label>
         <input className='form-control mb-3' type='text' value={formik.values.details} name='details' id='details' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.details && formik.touched.details? <div className="alert alert-danger m-2">{formik.errors.details}</div>: ""}
        
         <label htmlFor='city'>City:</label>
         <input className='form-control mb-3' type='text' value={formik.values.city} name='city' id='city' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.city && formik.touched.city? <div className="alert alert-danger m-2">{formik.errors.city}</div>: ""}
        
         <label htmlFor='phone'>Phone:</label>
         <input className='form-control mb-3' type='tell' value={formik.values.phone} name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.phone && formik.touched.phone? <div className="alert alert-danger m-2">{formik.errors.phone}</div>: ""}
       
        <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn my-2 w-75 bg-main text-white">Pay Now</button>
      
       </form>
     </div>
    
    </>
   
  )
}

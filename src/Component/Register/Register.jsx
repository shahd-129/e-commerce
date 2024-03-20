import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Regester2() {
  


let [errorMessge , setError] = useState("")
let [loading , setLoading] = useState(true)
let navegate =useNavigate()

// // Validation By Yup 
let phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
 let validation = Yup.object({
   name: Yup.string().min(3 , "minlength is 3").max(10 , "maxlength is 10").required("name is required"),
  phone:Yup.string().matches(phoneRegex , "phone is invalid").required("phone is required"),
   email: Yup.string().email("email is invalid").required("email is required"),
   password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , "password start with uppercase").required("passwor is required"),
 rePassword: Yup.string().oneOf([Yup.ref("password")] ,"repassword not match").required("repassword is required")
 })

  let formik = useFormik({
    initialValues:{
        name: "",
        Phone: "",
        email: "",
        password: "",
        rePassword: ""
    },validationSchema:validation,
    onSubmit:regesterSubmit
  })


  async function regesterSubmit(value) {
    setLoading(false)
    let req= await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" ,
    value ).catch(function (error) {
      setError(error.response.data.message)
      setLoading(true)
      navegate("/login")
    })
     console.log(req);
     if(req.data.message === "success"){
      setLoading(true)
     }
    }

    return (<>
    <div className='w-75 py-5 mx-auto'>
    <h2>Register Now ...</h2>
    {errorMessge !== ""?  <div className="alert alert-danger">{errorMessge}</div>
    : ""}
  
    <form onSubmit={formik.handleSubmit}>
  
         <label htmlFor='name'>Name:</label>
         <input className='form-control mb-3' type='text' value={formik.values.name} name='name' id='name' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.name && formik.touched.name? <div className="alert alert-danger m-2">{formik.errors.name}</div>: ""}
        
         <label htmlFor='phone'>Phone:</label>
         <input className='form-control mb-3' type='tell' value={formik.values.phone} name='phone' id='phone' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.Phone && formik.touched.Phone? <div className="alert alert-danger m-2">{formik.errors.Phone}</div>: ""}
       
         <label htmlFor='email'>Email:</label>
         <input className='form-control mb-3' type='email' value={formik.values.email} name='email' id='email' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.email && formik.touched.email? <div className="alert alert-danger m-2">{formik.errors.email}</div>: ""}
  
  
         <label htmlFor='password'>Password:</label>
         <input className='form-control mb-3' type='password' value={formik.values.password} name='password' id='password' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.password && formik.touched.password? <div className="alert alert-danger m-2">{formik.errors.password}</div>: ""}
  
         <label htmlFor='repassword'>RePassword:</label>
         <input className='form-control mb-3' type='password'  value={formik.values.rePassword} name='rePassword' id='rePassword' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
         {formik.errors.rePassword && formik.touched.rePassword? <div className="alert alert-danger m-2">{formik.errors.rePassword}</div>: ""}

        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn my-2 bg-main text-white">Register</button> : 
        <button type='button' className='btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin"></i></button>}
        
      

       </form>
     </div>
    
    </>
   
  )
}

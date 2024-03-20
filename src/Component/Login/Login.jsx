import axios from 'axios';
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import { UseContext } from '../Context/useContext';
import { CartContext } from '../Context/cartContext';

export default function Login() {
  let {setToken} = useContext(UseContext)
  let [errorMessge , setError] = useState("")
  let [loading , setLoading] = useState(true)
  let {getUserCart , setnumItem} = useContext(CartContext)

  let navegate =useNavigate()

 let validation = Yup.object({
   email: Yup.string().email("email is invalid").required("email is required"),
   password:Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/ , "password start with uppercase").required("passwor is required"),
   })


let formik = useFormik({
  initialValues:{
    email :"",
    password:""
  },validationSchema:validation,
  onSubmit:laginApi
})

 async  function laginApi(value) {
  setLoading(false)
    let req =  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin" , value)
    .catch(function(error){
        // console.log(error.data.message);
        setError(error.response.data.message)
        setLoading(true)
    })
      if(req?.data.message === 'success'){
      setLoading(true)
      localStorage.setItem("userToken", req.data.token)
      setToken(req.data.token) 
      getCartData()
      navegate("/")
      }
  }
  
  async function getCartData() {
    let req = await getUserCart().catch((error)=>{
      console.log(error);
    })
    if ( req?.data?.status === 'success'){
        setnumItem(req.data.numOfCartItems)
    }
  }
  
  return (<>
  
      <div className='w-75 py-5 m-auto'>
        <div className='mt-5'>
        <h2>Login Now...</h2>
      {errorMessge !== ""?  <div className="alert alert-danger">{errorMessge}</div>
      : ""}

   <form onSubmit={formik.handleSubmit}>
        <label htmlFor='email'>Email:</label>
        <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.email} id='name' type='text' name='email'/>
        {formik.errors.email && formik.touched.email? <div className="alert alert-danger m-2">{formik.errors.email}</div>: ""}
      
        <label htmlFor='password'>Password:</label>
        <input  onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control mb-3' value={formik.values.password} id='password' type='password' name='password'/>
        {formik.errors.password && formik.touched.password? <div className="alert alert-danger m-2">{formik.errors.password}</div>: ""}
        <div className='d-flex my-2 justify-content-between'>
        {loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className="btn  bg-main text-white">Login</button> : 
          <button type='button' className='btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin"></i></button>}
          <Link to='/forgetpassword' className='text-main'><p className='text-main'>Forget Password?.....</p></Link>
       </div>
       <Link className='text-main' to="/register"><p className='text-main'>Don't Have Acount?...</p></Link>
      </form>

        </div>
     



     
      </div>

  </>
  )
}

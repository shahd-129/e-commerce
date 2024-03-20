import axios from 'axios'
import { useFormik } from 'formik'
import React, {  useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import * as Yup from 'yup'

export default function ResetPassword() {

  let [loading, setLoading] = useState(true)
  let navg = useNavigate()
  let [errmsg, setError] = useState("")
  let validationSchema = Yup.object({
    email: Yup.string().required("email Required").email("enter Valid Email"),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9A-Z!@$%^&*()_-]{6,16}$/, "enter valid newPassword").required("newPassword Required"),
})
  let formik = useFormik({
    initialValues: {
        email: "",
        newPassword: "",
    },
    onSubmit: UpdatePassword,
    validationSchema,
  })
  async function UpdatePassword(val) {
    setLoading(false)
    let req = await axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', val).catch((err) => {
        setError(err.response.data.message)
    })
    if(req.data.token){
      setLoading(true)
      navg("/login")
    }
}


  return ( <>
    <div className='container mt-5  py-5'>
      <h2>reset your account password</h2>
     <form onSubmit={formik.handleSubmit}>
<div className='form-floating mb-3 '>
<input value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" className='form-control' name="email" id="email" />
<label htmlFor="email"> email</label>{(formik.errors.email && formik.touched.email) ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}
</div>


<div className='form-floating mb-3'>
    
    <input value={formik.values.newPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" className='form-control' name="newPassword" id="newPassword" />
    <label htmlFor="newPassword"> newPassword</label>
    
    
    {(formik.errors.newPassword && formik.touched.newPassword) ? <div className='alert alert-danger'>{formik.errors.newPassword}</div> : ""}
</div>

{loading ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>reset password</button> : <button type='button' className='btn bg-main text-white'><i className='fa-solid fa-spinner fa-spin'></i></button>}
</form>
    </div>
</>
  )
}

import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function ForgetPassword() {
      let [loading , setLoading] = useState(true)
    let [errmsg, setErr] = useState("")
    let nav = useNavigate()
    let [changForm, setChangeForm] = useState(true)

    let validationSchema = Yup.object({
        email: Yup.string().required("email Required").email("enter Valid Email"),
    })
    let validationSchema2 = Yup.object({
      resetCode: Yup.string().required("resetCode Required").matches(/^[0-9]{4,6}$/),
  })

    let formik1 = useFormik({
        initialValues: {
            email: ""
        },
        onSubmit: forgotPasswordsAPi,
        validationSchema
    })
 
let formik2 = useFormik({
  initialValues:{
    resetCode: ""
  },
  onSubmit:verifyResetCode,
  validationSchema: validationSchema2
})
 async function verifyResetCode(value) {
    setLoading(false)  
  let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',value).catch((err)=>{
      setErr(err.response.data.message)
    })
    if (req.data.status === 'Success') {
      setLoading(true)
      nav('/ResetPassword')
  }
   }
    async function forgotPasswordsAPi(value) {
        setLoading(false)
        let req = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value).catch((err) => {
            console.log(err);
            setErr(err.response.data.message)
        })
       if (req.data.statusMsg === 'success') {
        setLoading(true)
        setChangeForm(false)
    }
       
    }
    return (
      <div className='container py-5'>
      <div className='pt-5'>
        <div className='w-100 mx-auto my-5 '>
         {errmsg?<div className='alert alert-danger'>{errmsg}</div> :""}

         {changForm ?  <>
                <h2>please enter your email</h2>
                <form className='posi ' onSubmit={formik1.handleSubmit}>
                  <div className='form-floating mb-3 '>
                <input value={formik1.values.email} className='form-control ng-pristine ng-invalid ng-touched w-100 ' onChange={formik1.handleChange} onBlur={formik1.handleBlur} type="text" name="email" id="email" />
                <label >Email </label>
                </div>
                {loading ? <button disabled={!(formik1.isValid && formik1.dirty)} type='submit' className="btn my-2 bg-main text-white">send Code </button> : 
                    <button type='button' className='btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin"></i></button>}
            </form> 
            </> : <>
            <h2>please enter your verification code</h2>
                <form className='posi ' onSubmit={formik2.handleSubmit}>
                  <div className='form-floating mb-3 '>
                <input value={formik2.values.resetCode} onChange={formik2.handleChange} onBlur={formik2.handleBlur} className='form-control ng-pristine ng-invalid ng-touched w-100 '  type="text" name="resetCode" id="resetCode" />
                <label >Code</label>
              </div>
              {loading ? <button disabled={!(formik1.isValid && formik1.dirty)} type='submit' className="btn my-2 bg-main text-white">verify Code</button> : 
                    <button type='button' className='btn bg-main text-white'><i className="fa-solid fa-spinner fa-spin"></i></button>}
            </form> 
            </>}
       


        </div>
        </div>
        </div>
    )
}



// import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import logo from '../assets/images/freshcart-logo.svg'
import { UseContext } from '../Context/useContext'
import { useContext } from 'react'
import { CartContext } from '../Context/cartContext'

export default function Navbar() {


  
 let {numItem}  = useContext(CartContext)
  let {userToken , setToken} = useContext(UseContext)
  let naveg = useNavigate() 
  function  logout() {
    localStorage.removeItem("userToken")
    setToken(null)
    naveg("/login")
  }
  
    return (
    <>
    
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">
    <img src={logo} alt=''/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
     {userToken =! null ?  <ul className="navbar-nav m-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/product">Product</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brand">Brand</Link>
        </li>
      </ul> : ""}
        
     
        
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        {userToken !== null ? <>
          <NavLink to='/cart'>
      <div className='position-relative'>
         <li className="nav-item">
     <Link className="nav-link active" aria-current="page" to="#"><i className="fa-solid text-main fa-cart-shopping"></i></Link>
   </li>
   <span className='badge bg-danger rounded-circle text-light position-absolute top-0 start-50 mt-2 ms-1 translate-middle-y'>{numItem}</span>
   </div>
      </NavLink>
          <li className="nav-item">
       <span className="nav-link cursor-pointer" onClick={logout}>Logout</span>
     </li> 
        </>  
        
        : <>
       
        <li className="nav-item">
          <Link className="nav-link" to="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Register</Link>
        </li> 
        </>
      }
      </ul>
    </div>
  </div>
</nav>
    </>
  )
 
}

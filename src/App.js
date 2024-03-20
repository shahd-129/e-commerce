import { RouterProvider, createHashRouter } from 'react-router-dom'
import Layout from './Component/Layout/Layout'
import Home from './Component/Home/Home'
import Cart from './Component/Cart/Cart'
import Login from './Component/Login/Login'
import Categories from './Component/Categories/Categories'
import Notfond from './Component/Notfond/Notfond'
import Register from './Component/Register/Register'
import Product from './Component/Product/Product'
import ResetPassword from './Component/ResetPassword/ResetPassword'
import Brand from './Component/Brand/Brand'
import ForgetPassword from './Component/ForgetPass/ForgetPassword'
import { useContext, useEffect } from 'react'
import { UseContext } from './Component/Context/useContext'
import ProductDetailes from './Component/ProductDetailes/ProductDetailes'
import { CartContext } from './Component/Context/cartContext'
import CheckOut from './Component/CheckOut/CheckOut'
import AllOrders from './Component/AllOrders/AllOrders'
import Gurd from './Component/Gurd/Gurd'
export default function App() { 
 let routers = createHashRouter([
  {path: "/" , element: <Layout/> , children:[
    {index: true , element:<Gurd><Home/></Gurd>},
    {path: 'product' , element:<Gurd><Product/></Gurd>},
    {path:'productdetails/:id' , element:<Gurd><ProductDetailes/></Gurd>},
    {path: 'cart' , element:<Gurd><Cart/></Gurd>},
    {path :'login' , element: <Login/>},
    {path :'allorders' , element: <Gurd><AllOrders/></Gurd>},
    {path: 'brand' , element: <Gurd><Brand/></Gurd>},
    {path: 'categories' , element: <Gurd><Categories/></Gurd>},
    {path: 'register' , element: <Register/>},
    {path: 'forgetpassword' , element: <ForgetPassword/>},
    {path: 'checkout/:id' , element: <Gurd><CheckOut/></Gurd>},
    {path: 'resetpassword' , element: <ResetPassword/>},
    {path: '*' , element: <Notfond/>}
  ]}
 ])

 let {setToken} = useContext(UseContext)
 let {getUserCart , setnumItem} = useContext(CartContext)


 useEffect(()=>{
  if(localStorage.getItem("userToken") !== null){
    setToken(localStorage.getItem("userToken"))
    getCartData()
  }

  async function getCartData() {
  let req = await getUserCart().catch((error)=>{
    console.log(error);
  })
  if ( req?.data?.status === 'success'){
      setnumItem(req.data.numOfCartItems)
  }
}

 },[])

 return ( <>

 <RouterProvider router={routers}>
</RouterProvider>



  </>
  )
}

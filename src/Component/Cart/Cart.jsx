import { useContext, useState } from "react"
import { CartContext } from "../Context/cartContext"
import { useEffect } from "react"
import Loading from "../Loading/Loading"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"

export default function Cart() {
 
 let { getUserCart ,  updateCart , removeCart, setnumItem}= useContext(CartContext)
 let [cartData , setCartData] = useState(null)
 let [loading , setLoading] = useState(true)


 useEffect(()=>{
  getUserData()
 },[])


 async function getUserData() {
  setLoading(false) 
  let req = await getUserCart().catch((error)=>{
    console.log(error);
    if (error.response.data.statusMsg === "fail" ){
          setCartData(null)
          setLoading(false)
    }
  })
   if(req?.data.status === 'success'){
  //  setLoading(false)
    setCartData(req?.data.data)
   }
 }

async function removeItemCart(id){
   let req = await removeCart(id)
   if(req?.data.status === 'success'){
   setnumItem(req.data.numOfCartItems)
     setCartData(req.data.data)

 }
}


async function updateCartItem(id , count){
    if (count === 0){
        removeItemCart(id)
    }
    else{
      let req = await updateCart(id , count)
      if(req?.data.status === "success"){
        setCartData(req?.data?.data)
      }
    }
 
}


return (<>
  
  <Helmet>
      <meta charSet="utf-8" name='description' content='Cart' />
    <title>Cart</title>
  </Helmet>

 {loading ? <Loading></Loading> :
<>
{ cartData === null ? <div className="container py-5">
   <div className="container my-5 p-5 py-5 bg-light rounded">
     <div className="d-flexjustify-content-between mb-4">
       <h2>Cart Shop</h2>
       <p className="h2 mx-auto">your cart is empty</p>
     </div>
   </div>
 </div>:
 <div className="container py-5">
     <div className="contact my-5 bg-light rounded py-5">
         <div className="d-flex justify-content-between">
           <h2 className="mx-3">Cart Shop</h2>
           <Link to={"/checkout/" + cartData._id}>
           <button className="btn mx-5 btn-warning">Check Out</button>
           </Link>
        
         </div>
        
          <h5 className="text-main mx-3">Total Price:{cartData.totalCartPrice}EGP</h5>
         
         {cartData?.products.map((el)=>{
           return  <div key={el._id} className="row border-bottom border-3 py-5">
           <div className="col-md-10">
             <div className="row">
               <div className="col-md-2">
                 <img className="w-100" src={el?.product?.imageCover} alt=""></img>
               </div>
               <div className="col-md-10">
                 <h6>{el?.product?.title}</h6>
                 <h5 className="text-muted">price:{el?.price}EGP</h5>
                 <button onClick={()=>{removeItemCart(el?.product?._id)}} className="btn btn-sm btn-danger">Remove<i className="fa-solid fa-trash"></i></button>
               </div>
             </div>
           </div>
           <div className="col-md-2 my-4">
             <span onClick={()=>{updateCartItem(el.product._id , el.count+=1 )}} className="btn btn-success btn-sm"><i className="fa-solid fa-plus"></i></span>
             <span className="mx-2">{el.count}</span>
             <span onClick={()=>{updateCartItem(el.product._id , el.count-=1 )}} className="btn btn-danger btn-sm"><i className="fa-solid fa-minus"></i></span>
           </div>
         </div>
         })}
  
     </div>
 </div>
 
}
  
</>
} 



 </>
   )
  }
  

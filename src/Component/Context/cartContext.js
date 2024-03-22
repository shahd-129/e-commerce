import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
export  let CartContext =   createContext()
export function CartContextProvider({children}) {
   
let [numItem , setnumItem] =  useState(0)

 function getUserCart() {
          
          return axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
            headers : {
                token : localStorage.getItem("userToken")
            }
          })
          
          
 }

  function addCart(productId) {
  let body = {
    productId : productId
}
   try {
          return  axios.post("https://ecommerce.routemisr.com/api/v1/cart", body, {
              headers: {
                  token: localStorage.getItem("userToken")
              }
          });
      } catch (erro) {
          console.log(erro);
      }
    // console.log(req);
}

function removeCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
        headers : {
            token : localStorage.getItem("userToken")
        }

    })
}

function updateCart(id , count) {
   let body ={
            count : count
   }

    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, body , {
    headers : {
        token : localStorage.getItem("userToken")
    }
})

}

function checkOutPayment(id , data) {

   let body = {
    shippingAddress:data
   }
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${window.location.origin}` ,body, { headers : {
        token : localStorage.getItem("userToken")
    }})
}


   return <CartContext.Provider value={{ checkOutPayment ,updateCart ,removeCart , addCart , numItem , setnumItem , getUserCart}}>
        {children}
    </CartContext.Provider>
}
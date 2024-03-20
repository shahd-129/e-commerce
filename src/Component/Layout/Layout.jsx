import { Offline, Online } from 'react-detect-offline'
import Footer from '../Footer/Footer'
import Navbar from '../Navbar/Navbar'
// import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'



export default function Layout() {
  return (<>
 <div className='network'>
 <Offline>You're offline right now. Check your connection.</Offline>
 </div>
  <Navbar/>
  
  <Outlet/>
  <Footer/>
 
  </>
   
  )
}

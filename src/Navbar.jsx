import React, { useContext, useState } from 'react';
import './Navbar.css'
import { assets } from './assets/assets';
import { Link } from 'react-router-dom';
import Header from './Header';

const Navbar = ({setShowLogin}) => {

  const[menu,setMenu] = useState("menu")

  // <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>menu</a>
  //     <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>


  return (
    <>
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo"/></Link>
    <ul className="navbar-menu">
      <Link to='home' onClick={()=>setMenu("home")} className={menu==="Home"?"active":""}>Home</Link>
      
      <a href='#footer' onClick={()=>setMenu("contact us")} className={menu==="contact us"?"active":""}>contact us</a>
    </ul>
    <div className="navbar-right">
     <Link to='/map'>
            <img src={assets.search_icon} alt="Search" />
          </Link>
      <div className="navbar-search-icon">
         <Link to='/admin/login'><img src={assets.profile_icon} alt="" /></Link>
         <Link to='/user/login'><button onClick={()=>setShowLogin(true)}>sign in</button>
         </Link>
         </div>
      </div>
    </div>
    <Header/>
    </>
  )
}

export default Navbar

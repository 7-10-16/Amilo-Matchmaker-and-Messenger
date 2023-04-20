import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Link } from "react-router-dom";
// import ReactCountryFlag from "react-country-flag";
import Match from "../components/Match";
const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      {/* <span className="logo">Amilo</span> */}
      <div className="user">
        <Link to="/Profile"><img src={currentUser.photoURL} alt="" /></Link>
        <span className="username">{currentUser.displayName}</span>
        <Match/>
      </div>
    </div>
  )
  }  

export default Navbar
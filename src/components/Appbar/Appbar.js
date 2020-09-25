import React, { useContext } from 'react';
import { Nav, Navbar, Form, Button, FormControl } from 'react-bootstrap';
import './Appbar.css';
import Logo from '../../Image/Logo.png'
import { placeContext, userContext } from '../../App';
import { Link, useParams } from 'react-router-dom';

const Appbar = () => {
  const [getUser, setUserInfo] = useContext(userContext);
  const [place] = useContext(placeContext);
  const {id} = useParams();

  return (
    <>
      <nav className="navBar">
        <div className="logo"><Link to='/'><img className='logo' src={Logo} alt="Logo" /></Link></div>
        <div className="searchInput"><FormControl id="serachField" type="text" placeholder="Search Your Destination..." className="mr-md-2" /></div>
        <div className="links">
          <Link className='ml-5 text-dark' to='/'>Home</Link>
          <Link className='ml-5 text-dark' to="/booking/id">Booking</Link>
          <Link className='ml-5 text-dark' to='/find-hotel'>Hotel</Link>
        </div>
        <div className="currentUser">
          {getUser.userEmail ? <p className="text-info userName"> {getUser.userName} </p> : <Link to='/login'><button className="btn btn-warning">Login</button></Link>}
        </div>
      </nav>
    </>
  );
};

export default Appbar;
import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/features/login/loginSlice';

const links = [
  {
      id:1,
      path:"/home",
      label:"Home",
  },
  {
      id:1,
      path:"/todays-workout",
      label:"Today's Workout",
  },
  {
      id:2,
      path:"/profile",
      label:"Profile",
  },
  {
      id:3,
      path:"/workout-plan",
      label:"Workout Plans",
  },
  {
      id:4,
      path:"/about",
      label:"About",
  },
  {
      id:5,
      path:"/progress",
      label:"Progress",
  },
  {
      id:6,
      path:"/login",
      label:"Log out",
  },
]
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  const linkClickHandler = (label:string)=>{
    toggleMenu();
    if(label==="Log out"){
      dispatch(logout());
    }
  }

  return (
    <header className="mobile-navbar">
      <div className="mobile-navbar-container">
        <div className="mobile-navbar-brand">Muscle Metrics</div>
        <div className="mobile-navbar-toggle" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} className='fa-bars-icon' />
        </div>
      </div>
      {isOpen && (
        <nav className="mobile-navbar-menu">
            {links.map((item)=><Link to={item.path} key={item.id} onClick={()=>linkClickHandler(item.label)} className='mobile-navbar-item'>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
};

export default Navbar;

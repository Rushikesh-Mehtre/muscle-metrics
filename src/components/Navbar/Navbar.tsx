import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { FaBars } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const links = [
  {
    id: 1,
    path: "/home",
    label: "Home",
  },
  {
    id: 1,
    path: "/todays-workout",
    label: "Today's Workout",
  },
  {
    id: 2,
    path: "/profile",
    label: "Profile",
  },
  {
    id: 3,
    path: "/workout-plan",
    label: "Workout Plans",
  },
  {
    id: 4,
    path: "/about",
    label: "About",
  },
  {
    id: 5,
    path: "/progress",
    label: "Progress",
  },
  {
    id: 6,
    path: "/login",
    label: "Log out",
  },
]
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  const linkClickHandler = (label: string) => {
    toggleMenu();
    if (label === "Log out") {
      signOut(auth);
      // dispatch(logout());
    }
  }

  return (
    <header className="mobile-navbar">
      <div className="mobile-navbar-container">
        <div className="mobile-navbar-brand">Muscle Metrics</div>
        <div onClick={toggleMenu}>
          {isOpen ? <IoIosClose className='icon'/> : <FaBars className='icon' />}
        </div>
      </div>
      {isOpen && (
        <nav className="mobile-navbar-menu">
          {links.map((item) => <Link to={item.path} key={item.id} onClick={() => linkClickHandler(item.label)} className='mobile-navbar-item'>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
};

export default Navbar;

// import { Fragment } from 'react'
// import {
//     Disclosure,
//     DisclosureButton,
//     DisclosurePanel,
//     Menu,
//     MenuButton,
//     MenuItem,
//     MenuItems,
//     Transition,
// } from '@headlessui/react'
// import { } from '@heroicons/react/24/outline'
// import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
// import { useDispatch } from 'react-redux'
// import { logout } from '../../store/features/login/loginSlice'
// import { Link } from 'react-router-dom'
// import "./Navbar.scss"
// import { showAlert } from '../../store/features/alert/alertSlice'
// import { LOGGING_OUT_ALERT } from '../../utils/constants/app.constants'
// import { clearAllWorkouts } from '../../store/features/my-workout-plan/myWorkoutPlanSlice'

// const navigation = [
//     { name: 'Home', path: '/home', current: true },
//     { name: "Today's Workout", path: '/todays-workout', current: false },
//     { name: 'Workout Plan', path: '/workout-plan', current: false },
//     { name: 'Progress', path: '/progress', current: false },
//     { name: 'About', path: '/about', current: false },
// ]

// function classNames(...classes: any[]) {
//     return classes.filter(Boolean).join(' ')
// };

// export default function Navbar() {
//     const dispatch = useDispatch();
//     const logOutHandler = () => {
//         // clear isLoggedIn variable
//         dispatch(showAlert(LOGGING_OUT_ALERT))
//         setTimeout(() => {
//             dispatch(logout());
//             dispatch(clearAllWorkouts())
//         }, 1500); 
//     }

//     return (
//         <Disclosure as="nav" className="bg-gray-800 navbar-container">
//             {({ open }) => (
//                 <>
//                     <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//                         <div className="relative flex h-16 items-center justify-between">
//                             <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                                 {/* Mobile menu button*/}
//                                 <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                                     <span className="absolute -inset-0.5" />
//                                     <span className="sr-only">Open main menu</span>
//                                     {open ? (
//                                         <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                                     ) : (
//                                         <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                                     )}
//                                 </DisclosureButton>
//                             </div>
//                             <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                                 <div className="flex flex-shrink-0 items-center">
//                                     <img
//                                         className="h-8 w-auto"
//                                         src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                                         alt="Your Company"
//                                     />
//                                 </div>
//                                 <div className="hidden sm:ml-6 sm:block">
//                                     <div className="flex space-x-4">
//                                         {navigation.map((item) => (
//                                             <Link
//                                                 key={item.name}
//                                                 to={item.path}
//                                                 className={classNames(
//                                                     item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                                     'rounded-md px-3 py-2 text-sm font-medium'
//                                                 )}
//                                                 aria-current={item.current ? 'page' : undefined}
//                                             >
//                                                 {item.name}
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                                 <button
//                                     type="button"
//                                     className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                                 >
//                                     <span className="absolute -inset-1.5" />
//                                     <span className="sr-only">View notifications</span>
//                                     <BellIcon className="h-6 w-6" aria-hidden="true" />
//                                 </button>

//                                 {/* Profile dropdown */}
//                                 <Menu as="div" className="relative ml-3">
//                                     <div>
//                                         <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                                             <span className="absolute -inset-1.5" />
//                                             <span className="sr-only">Open user menu</span>
//                                             <img
//                                                 className="h-8 w-8 rounded-full"
//                                                 src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                                                 alt=""
//                                             />
//                                         </MenuButton>
//                                     </div>
//                                     <Transition
//                                         enter="transition ease-out duration-100"
//                                         enterFrom="transform opacity-0 scale-95"
//                                         enterTo="transform opacity-100 scale-100"
//                                         leave="transition ease-in duration-75"
//                                         leaveFrom="transform opacity-100 scale-100"
//                                         leaveTo="transform opacity-0 scale-95"
//                                     >
//                                         <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                                             <MenuItem>
//                                                 {({ focus }) => (
//                                                     <Link
//                                                         to="/profile"
//                                                         className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                                                     >
//                                                         Your Profile
//                                                     </Link>
//                                                 )}
//                                             </MenuItem>
//                                             <MenuItem>
//                                                 {({ focus }) => (
//                                                     <p
//                                                         onClick={logOutHandler}
//                                                         className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
//                                                     >
//                                                         Sign out
//                                                     </p>
//                                                 )}
//                                             </MenuItem>
//                                         </MenuItems>
//                                     </Transition>
//                                 </Menu>
//                             </div>
//                         </div>
//                     </div>

//                     <DisclosurePanel className="sm:hidden">
//                         <div className="space-y-1 px-2 pb-3 pt-2">
//                             {navigation.map((item) => (
//                                 <Link
//                                     key={item.name}
//                                     to={item.path}
//                                     className={classNames(
//                                         item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
//                                         'block rounded-md px-3 py-2 text-base font-medium'
//                                     )}
//                                     aria-current={item.current ? 'page' : undefined}
//                                 >
//                                     {item.name}
//                                 </Link>
//                             ))}
//                         </div>
//                     </DisclosurePanel>
//                 </>
//             )}
//         </Disclosure>
//     )
// }


import React, { useState } from 'react';
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    {
        id:1,
        path:"/home",
        label:"Home",
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
            {links.map((item)=><Link to={item.path} key={item.id} onClick={toggleMenu} className='mobile-navbar-item'>{item.label}</Link>)}
        </nav>
      )}
    </header>
  );
};

export default Navbar;
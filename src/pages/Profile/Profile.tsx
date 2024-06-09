import React from 'react'
import { Link } from 'react-router-dom'

const Profile = () => {
  return (
    <div className='profile-container'>
       <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                            <Link
                                to="/workout-plan"
                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            >
                                Add workout plan
                            </Link>
                        </div>
    </div>
  )
}

export default Profile
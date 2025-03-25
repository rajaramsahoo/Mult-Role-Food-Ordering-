import React from 'react'
import { Outlet } from 'react-router-dom'
import ResturantOwnerSidebar from './ResturantOwnerSidebar'

const ResturantOwnerlayout = () => {
  return (
    <div className="flex">
      <div className=" ">
        <ResturantOwnerSidebar />
      </div>


      {/* Main Content */}
      <div className="ml-auto w-full  h-screen overflow-y-auto mt-0">
        <Outlet />
      </div>
    </div>)
}

export default ResturantOwnerlayout
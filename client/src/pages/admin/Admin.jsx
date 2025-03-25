import React from 'react'
import AdminSidebar from './AdminSidebar'
import DashboardCont from './DashboardCont'
import AllRes from './AllRes'
import Demo2 from '@/components/Demo2'

const Admin = () => {
    return (
        <div className="flex ">

            <AdminSidebar />
            <div className="ml-auto w-full p-6 h-screen overflow-y-auto">
                <DashboardCont />
                {/* <AllRes/> */}
                {/* <Demo2/> */}
            </div>
        </div>
    )
}

export default Admin
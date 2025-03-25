import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] to-[#FCFCFC] min-h-screen">
      <Navbar />
      <div className="min-h-screen flex flex-col">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Button disabled className="bg-orange hover:bg-hoverOrange flex items-center">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          </div>
        ) : (
          <Outlet />  
        )}
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout;

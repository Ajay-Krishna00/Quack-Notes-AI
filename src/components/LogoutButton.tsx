"use client"
import React from 'react'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { logoutAction } from '@/actions/users'

function LogoutButton() {
  const [loading, setLoading] = React.useState(false)
  const router = useRouter();
  const handleLogout = async () => {
    setLoading(true)
    console.log("Logout")
    const {errorMessage} = await logoutAction();
    if (!errorMessage) {
      toast.success("Logged out successfully")
      router.push("/")
    }
    else {
      toast.error("Error logging out")
    }
    setLoading(false)
  }
  return (
    <Button variant={'outline'}
      className='w-24'
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <Loader2 className='animate-spin' /> : "Log Out"}
    </Button>
  )
}

export default LogoutButton
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import {Button} from './ui/button'
import DarkModeToggle from './DarkModeToggle';
import LogoutButton from './LogoutButton';
import { getUser } from '@/auth/server';
import { SidebarTrigger } from './ui/sidebar';

async function Header() {
  const user = await getUser();
  return (
    <header className='flex bg-popover relative h-24 w-full justify-between items-center px-3 sm:px-8 '
    style={
      { boxShadow: '0 0 10px 0 rgba(77, 209, 223, .5)' }
    }
    >
      <SidebarTrigger className='absolute left-2 '/>
      <Link href="/" className='flex items-center gap-2 ml-6'>
        <Image src="/quack.jpeg" height={70} width={70} alt="logo" className='rounded-full' priority />
        <h1 className='text-3xl font-semibold flex flex-col leading-7'>
          Quack <span className='text-2xl'>Notes AI</span>
        </h1>
      </Link>
      <div className='flex gap-4'>
        {user ? (
          <LogoutButton/> 
        ) : ( 
            <>              
            <Button asChild className="hidden sm:block">
              <Link href="/signup" >
                Sign Up
              </Link>
            </Button>
            <Button asChild variant={'outline'} className=' font-semibold'>
              <Link href="/login">
                Login
              </Link>
            </Button>
          </>
        )}
        <DarkModeToggle />
      </div>
    </header>
  )
}

export default Header
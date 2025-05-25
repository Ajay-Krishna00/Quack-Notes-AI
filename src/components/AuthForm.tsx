'use client'
import { useRouter } from 'next/navigation';
import React, { useTransition } from 'react'
import { CardContent, CardFooter } from './ui/card';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { loginAction, signupAction } from '@/actions/users';

type Props = {
  type: "login" | "signup" // or string;
}

function AuthForm({type}:Props) {
  const isLogin = type === "login";
  
  const router = useRouter();
  const [isPending, startTransition]=useTransition();

  const handleSubmit=(formData:FormData) => {
    startTransition(async () => { // startTransition is used to mark the state update as a transition
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      
      let errorMessage;
      let title;
      let description;
      if (isLogin) {
        errorMessage = (await loginAction(email, password)).errorMessage;
        title = "Logged in";
        description = "You have successfully logged in.";
      }
      else {
        errorMessage = (await signupAction(email, password)).errorMessage;
        title = "Signed UP";
        description = "Check your email for conformation link.";
      }

      if (!errorMessage) {
        toast.success(title,
          { description: description, })
        router.replace("/");
      }
      else {
        toast.error("Error",
          { description: errorMessage, })
      }
    })
  }
  return (
    <form action={handleSubmit}>
      <CardContent className='flex flex-col space-y-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor="email">Email</Label>
          <input type="email" name="email" id="email" required placeholder='Enter your Email' disabled={isPending} />
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor="password">Password</Label>
          <input type="password" name="password" id="password" required placeholder='Enter your Password' disabled={isPending} />
        </div>
      </CardContent>
      <CardFooter className='mt-5 flex flex-col gap-6'>
        <Button className='w-full'>
          {isPending ? <Loader2 className='animate-spin' /> : isLogin ? "Login" : "Sign Up"}
        </Button>
        <p>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isLogin ? "/signup" : "/login"}
            className={`text-blue-500 hover:text-blue-700 transition-colors duration-200 ${isPending && "pointer-events-none"}`}>
            {" "}{isLogin ? "Sign Up" : "Login"}
          </Link>
        </p>
      </CardFooter>
    </form>
  )
}

export default AuthForm
"use client";
import {User} from "@supabase/supabase-js"
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "sonner";
import { createNoteAction } from "@/actions/note";

type Props = {
  user: User | null;
}

function NewNoteBtn({user}: Props) {
  const router =useRouter();
  const [loading, setLoading] = useState(false);  
  const handleNewNoteBtn = async () => {
    if(!user){
      router.push("/login")
    }
    else {
      setLoading(true);
      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?notes=${uuid}`);
      toast.success("New note created")
    }
    setLoading(false);
  }
  return (
    <Button
      onClick={handleNewNoteBtn}
      variant={'secondary'}
      className='w-24'
      disabled={loading}
    >
      {loading? <Loader2 className='animate-spin' /> : "New Note"}
    </Button>
  )
}

export default NewNoteBtn
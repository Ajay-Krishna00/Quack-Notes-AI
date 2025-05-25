"use client"
import React, { useEffect, useState } from 'react'
import  {Note}  from "@prisma/client"
import { useSearchParams } from 'next/navigation';
import useNote from '@/hooks/useNote';
import { SidebarMenuButton } from './ui/sidebar';
import Link from 'next/link';

type Props = {
  note: Note;
}

function SelectNoteBtn({ note }: Props) {
  const noteId = useSearchParams().get("notes") || "";
  const { noteText: selectNoteText } = useNote();
  const [localText, setLocalText] = useState(note.text);
  const [shouldUseGlobalText, setShouldUseGlobalText] = useState(false);

  useEffect(() => {
    if (noteId === note.id) {
      setShouldUseGlobalText(true);
    }
    else {
      setShouldUseGlobalText(false);
    }
  }, [noteId, note.id])
  
  useEffect(() => {
    if (shouldUseGlobalText) {
      setLocalText(selectNoteText);
    }
  },[shouldUseGlobalText, selectNoteText])

  const blankText = "EMPTY NOTE";

  let noteText = localText || blankText;
  if (shouldUseGlobalText) {
    noteText = selectNoteText || blankText;
  }

  return (
    <SidebarMenuButton asChild className={`items-start gap-0 pr-10 ${note.id===noteId && "bg-sidebar-accent/70"}`}>
      <Link href={`?/notes/${note.id}`} className='flex h-fit flex-col'>
        <p className='w-full truncate text-ellipsis overflow-hidden  whitespace-nowrap text-sm font-semibold'>
        {noteText}
        </p>
        <p className='text-xs text-muted-foreground'>
          {note.updatedAt.toLocaleDateString()}
      </p>
      </Link>
    </SidebarMenuButton>
  )
}

export default SelectNoteBtn
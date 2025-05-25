import { getUser } from '@/auth/server'
import AskAiBtn from '@/components/AskAiBtn';
import NewNoteBtn from '@/components/NewNoteBtn';
import NoteTextInput from '@/components/NoteTextInput';
import { prisma } from '@/db/prisma';
import React from 'react'

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

async function HomePage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const noteIdParam = resolvedParams.notes;
  const user = await getUser();

  const noteId = Array.isArray(noteIdParam)
    ? noteIdParam![0]
    : noteIdParam || "";

  const note = await prisma.note.findUnique({
    where: { id: noteId, authorId: user?.id },
  });
  console.log("in page",noteId)
  return (
    <div className='flex flex-col h-full items-center justify-center'>
      <div className='flex flex-row w-full max-w-4xl mb-2 justify-end gap-2'>
        <AskAiBtn user={user} />
        <NewNoteBtn user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
      
    </div>
  )
}

export default HomePage
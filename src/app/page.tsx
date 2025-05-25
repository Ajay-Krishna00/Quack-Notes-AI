import { getUser } from "@/auth/server";
import AskAiBtn from "@/components/AskAiBtn";
import NewNoteBtn from "@/components/NewNoteBtn";
import NoteTextInput from "@/components/NoteTextInput";
import { prisma } from "@/db/prisma";
import React from "react";

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
  console.log("in page", noteId);
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="mb-2 flex w-full max-w-4xl flex-row justify-end gap-2">
        <AskAiBtn user={user} />
        <NewNoteBtn user={user} />
      </div>
      <NoteTextInput noteId={noteId} startingNoteText={note?.text || ""} />
    </div>
  );
}

export default HomePage;

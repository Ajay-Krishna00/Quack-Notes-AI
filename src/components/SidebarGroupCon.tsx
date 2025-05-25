"use client";

import { Note } from "@prisma/client";
import {
  SidebarGroupContent as SidebarGroupContentShadCN,
  SidebarMenu,
  SidebarMenuItem,
} from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import SelectNoteBtn from "./SelectNoteBtn";
import DeleteNoteBtn from "./DeleteNoteBtn";
import { useRouter } from "next/navigation";

type Props = {
  notes: Note[];
};

function SidebarGroupCon({ notes }: Props) {
  const [searchText, setSearchText] = useState<string>("");
  const [localNotes, setLocalNotes] = useState(notes);

  const router = useRouter();

  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(localNotes, {
      keys: ["text"],
      threshold: 0.4,
    });
  }, [localNotes]);

  const filteredNotes = searchText
    ? fuse.search(searchText).map((result) => result.item)
    : localNotes;

  const deleteNoteLocally = (notesId: string) => {
    setLocalNotes((prevNotes) =>
      prevNotes.filter((note) => note.id !== notesId),
    );
  };

  const handleSelectNote = (noteId: string) => {
    return () => {
      const note = localNotes.find((n) => n.id === noteId); // Find the note in the local notes
      if (!note) return;
      if (note) {
        router.push(`/?notes=${note.id}`);
      }
    };
  };

  return (
    <SidebarGroupContentShadCN>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input
          className="bg-muted pl-8"
          placeholder="Search Your notes..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <SidebarMenu>
        {filteredNotes.map((note) => (
          <SidebarMenuItem
            key={note.id}
            className="group/item"
            onClick={handleSelectNote(note.id)}
          >
            <SelectNoteBtn note={note} />
            <DeleteNoteBtn
              noteId={note.id}
              deleteNoteLocally={deleteNoteLocally}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContentShadCN>
  );
}

export default SidebarGroupCon;

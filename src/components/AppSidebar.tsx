import { getUser } from "@/auth/server"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupCon from "./SidebarGroupCon";

export async function AppSidebar() {
  const user = await getUser();
  let notes: Note[] = [];
  if (user) {
    notes = await prisma.note.findMany({
      where: {
        authorId: user.id,
      },
      orderBy: {
        updatedAt: "desc"
      }
    });
  }
  return (
    <Sidebar>
      <SidebarContent className="custom-scrollbar">
        <SidebarGroup />
        <SidebarGroupLabel className="text-2xl font-semibold">
          {user ? (
            "Your Notes"
          )
          :(
              <p>
                <Link href={"/login"} className="underline">
                Login to see your notes
                </Link>
              </p>
          )}
        </SidebarGroupLabel>
        {user && <SidebarGroupCon notes={notes}/>}
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

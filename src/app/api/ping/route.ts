import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();
  const data = await prisma.note.findFirst({
    where: {
      authorId: user?.id,
    },
    select: {
      text: true,
    },
  });
  return NextResponse.json({
    status: `pong: ${data?.text ?? "no note found"}`,
  });
}

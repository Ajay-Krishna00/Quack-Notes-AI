import { getUser } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await getUser();
  const data = await prisma.note.findFirst({
    where: {
      authorId: user?.id,
    },
    select: {
      text: true,
    },
  });
  return new NextResponse(
    JSON.stringify({
      status: `pong: ${data?.text ?? "no note found"}`,
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "//https://beast-log.vercel.app", 
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );

}

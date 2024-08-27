import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  const topPlayers = await prisma.rank.findMany({
    orderBy: {
      score: "desc",
    },
    take: 5,
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });

  const result = topPlayers.map((player) => ({
    email: player.user.email,
    score: player.score,
  }));

  return NextResponse.json(result);
}

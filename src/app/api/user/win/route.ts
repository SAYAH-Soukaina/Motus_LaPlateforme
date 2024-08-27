// api/user/win

import { getSession } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export async function POST() {
  const prisma = new PrismaClient();
  const session = await getSession();

  if (!session?.user?.email) {
    return NextResponse.json(
      { error: "User email not found" },
      { status: 401 }
    );
  }

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: { email: session.user.email },
  });

  let rank = await prisma.rank.findFirst({
    where: { userId: user.id },
  });

  if (rank) {
    const incrementValue = rank.score > 50 ? 10 : 5;

    rank = await prisma.rank.update({
      where: { id: rank.id },
      data: {
        score: {
          increment: incrementValue,
        },
      },
    });
  } else {
    const initialScore = 5;

    rank = await prisma.rank.create({
      data: {
        score: initialScore,
        userId: user.id,
      },
    });
  }

  return NextResponse.json({ score: rank.score });
}
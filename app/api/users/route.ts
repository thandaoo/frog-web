import { NextRequest, NextResponse } from "next/server";

import prisma from "@/prisma/client";

export async function GET(request: NextRequest) {
    console.log('request: ', request);
    const users =await prisma.user.findMany({
        orderBy: {name: 'asc'}
    })

    return NextResponse.json(users)
}
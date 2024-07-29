import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const data = require('./destinations.json')

    return NextResponse.json(data);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to fetch products" }),
      { status: 500 }
    );
  }
}

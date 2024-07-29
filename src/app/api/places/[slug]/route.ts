import { Place } from '@/components/Interface';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { slug: string } }): Promise<NextResponse> {
  try {
    const data = require('../places.json')
    



    const place = data.find((place: Place) => place.slug === params.slug);

    if (!place) {
      return new NextResponse(
        JSON.stringify({ message: 'Place not found' }),
        { status: 404 }
      );
    }

    return NextResponse.json(place);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: 'Failed to fetch place' }),
      { status: 500 }
    );
  }
}

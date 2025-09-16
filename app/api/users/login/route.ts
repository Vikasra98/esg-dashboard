import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch('http://alb-public-backend-dev-71866973.us-east-1.elb.amazonaws.com/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: 'Backend request failed', 
          status: response.status,
          message: data 
        }, 
        { status: response.status }
      );
    }

    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://alb-public-backend-dev-71866973.us-east-1.elb.amazonaws.com";

export async function GET(request: NextRequest) {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/metrics/overview`, {
      method: "GET",
      headers: {
        "accept": "application/json",
        "Authorization": request.headers.get("Authorization") || "",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Failed to fetch metrics overview" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching metrics overview:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

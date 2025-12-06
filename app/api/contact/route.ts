import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import type { ApiResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    
    console.log("received data", body);
    
    // Validate data using zod

    const validatedData = contactFormSchema.parse(body);

    // Send data to n8n webhook
    const webhookUrl = process.env.N8N_WEBHOOK_URL;

    if (!webhookUrl) {
      console.error("N8N_WEBHOOK_URL is not defined in environment variables");
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Internal Server Error",
          error: "Webhook URL not configured",
        },
        { status: 500 }
      );
    }

    const n8nResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...validatedData,
        submittedAt: new Date().toISOString(),
        source: "website",
      }),
    });

    if (!n8nResponse.ok) {
      throw new Error(
        `n8n webhook responded with status ${n8nResponse.status}`
      );
    }

    const n8nData = await n8nResponse.json();

    console.log("Lead Cptured:", {
      email: validatedData.email,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json<ApiResponse>({
      success: true,
      message: "Thank you for your interest! We'll contact you soon.",
    });
  } catch (error) {
    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          message: "Invalid form data",
          error: "Please check your input and try again",
        },
        { status: 400 }
      );
    }

    console.error("Contact form error:", error);

    return NextResponse.json<ApiResponse>(
      {
        success: false,
        message: "Something went wrong",
        error: "Please try again later",
      },
      { status: 500 }
    );
  }
}

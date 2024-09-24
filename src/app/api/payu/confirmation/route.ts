import { NextRequest, NextResponse } from "next/server"
import { medusaClient } from "@lib/config"
import { placeOrder } from "@modules/checkout/actions"

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const reference = body.get("reference_sale")
  const status = body.get("state_pol")

  try {
    if (status === "4") {
      // Payment approved
      await placeOrder()
      // The placeOrder function will handle the redirection
      return NextResponse.json({ success: true })
    } else if (status === "6" || status === "5") {
      // Payment declined or expired
      const { order } = await medusaClient.orders.retrieveByCartId(
        reference as string
      )
      if (order) {
        await medusaClient.orders.cancel(order.id)
      }
      return NextResponse.json({ error: "Payment failed" }, { status: 400 })
    }

    return NextResponse.json(
      { error: "Invalid payment status" },
      { status: 400 }
    )
  } catch (error) {
    console.error("Error handling PayU response:", error)
    return NextResponse.json(
      { error: "Error handling PayU response" },
      { status: 500 }
    )
  }
}

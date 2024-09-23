import { NextRequest, NextResponse } from "next/server"
import { medusaClient } from "@lib/config"

export async function POST(req: NextRequest) {
  const body = await req.formData()
  const reference = body.get("reference_sale")
  const status = body.get("state_pol")

  try {
    // Retrieve the order using the reference (which should be the cart id)
    const { order } = await medusaClient.orders.retrieveByCartId(
      reference as string
    )

    if (!order) {
      throw new Error("Order not found")
    }

    // Update the order status based on PayU's response
    if (status === "4") {
      // Payment approved
      await medusaClient.orders.complete(order.id)
    } else if (status === "6" || status === "5") {
      // Payment declined or expired
      await medusaClient.orders.cancel(order.id)
    }

    // Redirect to the order confirmation page
    return NextResponse.redirect(`/order/confirmed/${order.id}`)
  } catch (error) {
    console.error("Error handling PayU response:", error)
    return NextResponse.json(
      { error: "Error handling PayU response" },
      { status: 500 }
    )
  }
}

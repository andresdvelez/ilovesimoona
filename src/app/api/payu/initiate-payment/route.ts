import { medusaClient } from "@lib/config"
import { formatAmount } from "@lib/util/prices"
import { NextRequest, NextResponse } from "next/server"

function safeStringify(obj: any) {
  const cache = new Set()
  return JSON.stringify(
    obj,
    (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (cache.has(value)) {
          return "[Circular]"
        }
        cache.add(value)
      }
      return value
    },
    2
  )
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { cartId } = body

    const result = await medusaClient.carts.setPaymentSession(cartId, {
      provider_id: "payu",
    })

    if (!result.cart?.payment_session) {
      throw new Error("Payment session not created")
    }

    const { paymentUrl, payDetails } = result.cart.payment_session.data

    return NextResponse.json(
      {
        paymentUrl,
        payDetails,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error initiating PayU payment:", error)
    return NextResponse.json(
      {
        error: "Error initiating PayU payment",
        details: (error as { message: string })?.message,
      },
      { status: 500 }
    )
  }
}

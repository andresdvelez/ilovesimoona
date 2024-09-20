import { Badge } from "@medusajs/ui"

const PaymentTest = ({ className }: { className?: string }) => {
  return (
    <Badge color="orange" className={className}>
      <span className="font-semibold">Atención:</span> Únicamente para pruebas
      .
    </Badge>
  )
}

export default PaymentTest

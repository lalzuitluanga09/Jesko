interface Payment {
  id: number
  order_id: number
  order_number?: string
  payment_mode: string
  gateway: string
  transaction_id: string
  receipt_number?: string
  amount: number,
  status: string
  paid_at: Date,
  meta: string,

}

export type { Payment };
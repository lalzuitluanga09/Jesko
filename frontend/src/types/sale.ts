interface Sale {
  id: number
  store_id: number
  name: string
  type: string
  description: string
  discount_type: string
  discount_value: number,
  rules: {
    bogoX: number,
    bogoY: number,
  },
  start_at: Date
  end_at: Date,
  status: string,
  applyTo: string,
  selectedProducts: number[],
  selectedCategories: number[],
}

export type { Sale };
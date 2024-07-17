import { z } from 'zod'

import { TransactionTypes } from 'utils/config'

export const transactionSchema = z.object({
  id: z.string(),
  type: z.enum([
    TransactionTypes.INCOME,
    TransactionTypes.EXPENSE,
    TransactionTypes.TRANSFER
  ]),
  date: z.coerce.date(),
  accountId: z.string(),
  subcategoryId: z.string(),
  amount: z.number(),
  description: z.string().optional()
})

export type Transaction = z.infer<typeof transactionSchema>

export type Expense = Omit<Transaction, 'type'>
export type Income = Omit<Transaction, 'type'>
export type Transfer = Omit<Transaction, 'description' | 'category'>

export interface Filters {
  type?: TransactionTypes
}

export interface BatchResponse {
  rows: number
  message: string
}

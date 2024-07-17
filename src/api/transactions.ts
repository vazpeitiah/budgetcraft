import { Filters, Transaction, transactionSchema } from 'models/Transaction'
import { TransactionTypes } from 'utils/config'

import api from './api'

export const TRANSACTIONS_URL = '/transactions'

export const getTransactions = async () => {
  const res = await api.get(TRANSACTIONS_URL)
  return transactionSchema.array().parse(res.data)
}

export const createTransaction = (data: Transaction) => {
  return api.post(`${TRANSACTIONS_URL}/create`, data)
}

export const deleteTransaction = (id: number) => {
  return api.delete(`${TRANSACTIONS_URL}/${id}`)
}

export const getBalance = () => {
  return api.get(`${TRANSACTIONS_URL}/balance`)
}

export const updateTransaction = (data: Transaction) => {
  return api.put(`${TRANSACTIONS_URL}/${data.id}`, data)
}

export const createBatchTransactions = (file: File) => {
  const data = new FormData()
  data.append('file', file)
  return api.post(`${TRANSACTIONS_URL}/create-batch`, data, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}

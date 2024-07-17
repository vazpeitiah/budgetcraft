import { Account } from 'models/Account'

import api from './api'

export const ACCOUNTS_URL = '/accounts'

export const getAccounts = () => {
  return api.get(ACCOUNTS_URL)
}

export const createAccount = (data: Account) => {
  return api.post(ACCOUNTS_URL, data)
}

export const deleteAccount = (id: number) => {
  return api.delete(`${ACCOUNTS_URL}/${id}`)
}

export const updateAccount = (data: Account) => {
  return api.put(`${ACCOUNTS_URL}/${data.id}`, data)
}

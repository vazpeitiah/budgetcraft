import { Category } from 'models/Category'
import { TransactionTypes } from 'utils/config'

import api from './api'

export const CATEGORIES_URL = '/categories'
export const CATEGORIES_TYPES_URL = '/categories/types'

export const getCategories = (transactionType?: TransactionTypes) => {
  if (!transactionType) {
    return api.get(CATEGORIES_URL)
  }
  return api.get(`${CATEGORIES_TYPES_URL}/${transactionType}`)
}

export const createCategory = (data: Category) => {
  return api.post(CATEGORIES_URL, data)
}

export const deleteCategory = (id: number | undefined) => {
  return api.delete(`${CATEGORIES_URL}/${id}`)
}

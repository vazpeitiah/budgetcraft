import api from './api'

export const ACCOUNT_TYPES_URL = '/account-type'

export const getAccountTypes = () => {
  return api.get(ACCOUNT_TYPES_URL)
}

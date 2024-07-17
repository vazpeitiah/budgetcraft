import { useQuery } from '@tanstack/react-query'

import { getTransactions } from 'api/transactions'

export const QK_GET_TRANSACTIONS = 'transactions'

const useGetTransactions = () => {
  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: [QK_GET_TRANSACTIONS],
    queryFn: () => getTransactions()
  })

  return {
    transactions: data,
    error,
    isSuccess,
    isError,
    isLoading
  }
}

export default useGetTransactions

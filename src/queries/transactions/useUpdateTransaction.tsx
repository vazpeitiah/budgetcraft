import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { updateTransaction } from 'api/transactions'
import ErrorType from 'models/Error'
import { Transaction } from 'models/Transaction'
import { useAlerts } from 'providers/AlertsProvider'
import { queryClient } from 'queries/queryClient'

import { QK_GET_BALANCE } from './useGetBalance'
import { QK_GET_TRANSACTIONS } from './useGetTransactions'

const useUpdateTransaction = () => {
  const alerts = useAlerts()
  const { data, isError, isSuccess, isPending, mutate, error } = useMutation<
    AxiosResponse<Transaction, unknown>,
    AxiosError<ErrorType, unknown>,
    Transaction
  >({
    mutationFn: (data) => updateTransaction(data),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QK_GET_TRANSACTIONS]
      })
      queryClient.invalidateQueries({
        queryKey: [QK_GET_BALANCE]
      })
    }
  })

  useEffect(() => {
    if (isError) {
      alerts.error(error.response?.data?.error ?? '')
    }
  }, [isError])

  return {
    data: data?.data,
    isError,
    isSuccess,
    isPending,
    updateTransaction: mutate
  }
}

export default useUpdateTransaction

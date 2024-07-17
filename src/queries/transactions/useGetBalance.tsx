import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { getBalance } from 'api/transactions'
import Balance from 'models/Balance'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'

export const QK_GET_BALANCE = 'balance'

const useGetBalance = () => {
  const alerts = useAlerts()
  const { data, error, isLoading, isSuccess, isError, isPending } = useQuery<
    AxiosResponse<Balance | undefined>,
    AxiosError<ErrorType>
  >({
    queryKey: [QK_GET_BALANCE],
    queryFn: () => getBalance()
  })

  useEffect(() => {
    if (isError) {
      alerts.error(`${QK_GET_BALANCE}: ${error.response?.data?.error}`)
    }
  }, [isError])

  return {
    balance: data?.data,
    error,
    isSuccess,
    isError,
    isLoading,
    isPending
  }
}

export default useGetBalance

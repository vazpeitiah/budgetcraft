import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { getAccounts } from 'api/accounts'
import { Account } from 'models/Account'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'

export const QK_GET_ACCOUNTS = 'accounts'

const useGetAccounts = () => {
  const alerts = useAlerts()
  const { data, error, isLoading, isSuccess, isError } = useQuery<
    AxiosResponse<Account[], unknown>,
    AxiosError<ErrorType>
  >({
    queryKey: [QK_GET_ACCOUNTS],
    queryFn: async () => await getAccounts()
  })

  useEffect(() => {
    if (isError) {
      alerts.error(`${QK_GET_ACCOUNTS}, ${error.response?.data?.error}`)
    }
  }, [isError])

  const getAccountById = (id?: number) => {
    return data?.data?.find((account) => account.id && account.id === id)
  }

  return {
    accounts: data?.data,
    getAccountById,
    error,
    isSuccess,
    isError,
    isLoading
  }
}

export default useGetAccounts

import { useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { getAccountTypes } from 'api/account_types'
import AccountType from 'models/AccountType'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'

export const QK_GET_ACCOUNTS_TYPES = 'accountsTypes'

const useGetAccountTypes = () => {
  const alerts = useAlerts()
  const { data, error, isLoading, isSuccess, isError } = useQuery<
    AxiosResponse<AccountType[], unknown>,
    AxiosError<ErrorType>
  >({
    queryKey: [QK_GET_ACCOUNTS_TYPES],
    queryFn: async () => await getAccountTypes()
  })

  useEffect(() => {
    if (isError) {
      alerts.error(`${QK_GET_ACCOUNTS_TYPES}: ${error.response?.data?.error}`)
    }
  }, [isError])

  return {
    accountTypes: data?.data,
    error,
    isSuccess,
    isError,
    isLoading
  }
}

export default useGetAccountTypes

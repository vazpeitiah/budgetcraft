import { useMutation } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { deleteAccount } from 'api/accounts'
import { Account } from 'models/Account'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'
import { queryClient } from 'queries/queryClient'

import { QK_GET_ACCOUNTS } from './useGetAccounts'

const useDeleteAccount = () => {
  const alerts = useAlerts()
  const { data, error, isPending, isSuccess, isError, mutate } = useMutation<
    AxiosResponse<Account[], unknown>,
    AxiosError<ErrorType>,
    number | undefined
  >({
    mutationFn: (id) => deleteAccount(id as number),
    onSettled: () =>
      queryClient.invalidateQueries({
        queryKey: [QK_GET_ACCOUNTS]
      })
  })

  useEffect(() => {
    if (isError) {
      alerts.error(error.response?.data?.error ?? '')
    }
  }, [isError])

  return {
    data: data?.data,
    deleteAccount: mutate,
    error,
    isSuccess,
    isError,
    isPending
  }
}

export default useDeleteAccount

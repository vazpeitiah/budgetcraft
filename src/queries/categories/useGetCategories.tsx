import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { AxiosError, AxiosResponse } from 'axios'
import { useEffect } from 'react'

import { getCategories } from 'api/categories'
import { Category } from 'models/Category'
import ErrorType from 'models/Error'
import { useAlerts } from 'providers/AlertsProvider'
import { TransactionTypes } from 'utils/config'

export const QK_GET_CATEGORIES = 'categories'

const useGetCategories = (transactionType?: TransactionTypes) => {
  const alerts = useAlerts()
  const { data, error, isError, isLoading, isSuccess, isPending, refetch } =
    useQuery<AxiosResponse<Category[]>, AxiosError<ErrorType>>({
      queryKey: [QK_GET_CATEGORIES, transactionType],
      queryFn: () => getCategories(transactionType),
      placeholderData: keepPreviousData
    })

  useEffect(() => {
    if (isError) {
      alerts.error(`${QK_GET_CATEGORIES}: ${error.response?.data?.error}`)
    }
  }, [isError])

  const getCategoryById = (id?: number) => {
    return data?.data.find((category) => category.id && category.id === id)
  }

  return {
    categories: data?.data,
    getCategoryById,
    error,
    isError,
    isLoading,
    isSuccess,
    isPending,
    refetch
  }
}

export default useGetCategories

import { EditPencil, Trash } from 'iconoir-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Toggle from 'components/Toggle/Toggle'
import AppFrame from 'frames/AppFrame'
import useGetCategories from 'queries/categories/useGetCategories'
import { TransactionTypes } from 'utils/config'

const CategoriesPage = () => {
  const [transactionType, setTransactionType] = useState<TransactionTypes>(
    TransactionTypes.EXPENSE
  )
  const {
    categories,
    isPending: isLoading,
    isError
  } = useGetCategories(transactionType)
  const { t } = useTranslation()

  const toggleTransactionType = (checked: boolean) => {
    if (checked) {
      setTransactionType(TransactionTypes.INCOME)
    } else {
      setTransactionType(TransactionTypes.EXPENSE)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <AppFrame>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl">{t('categories.title')}</h1>
        <Toggle
          label={t('transactionTypes.income')}
          onChange={toggleTransactionType}
        />
      </div>
      <div className="my-2 h-[1px] bg-secondary-content w-full" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{t('categories.name')}</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {categories?.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.name}</td>
                <td>
                  <button className="link link-info">
                    <EditPencil />
                  </button>
                </td>
                <td>
                  <button className="link link-error">
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppFrame>
  )
}

export default CategoriesPage

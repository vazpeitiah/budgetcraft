import { createColumnHelper } from '@tanstack/react-table'
import clsx from 'clsx'
import { Edit, PlusSquareSolid, Trash, UploadSquareSolid } from 'iconoir-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Modal } from 'components'
import Table from 'components/Table/Table'
import AppFrame from 'frames/AppFrame'
import { Transaction } from 'models/Transaction'
import { useAlerts } from 'providers/AlertsProvider'
import useGetAccounts from 'queries/accounts/useGetAccounts'
import useGetCategories from 'queries/categories/useGetCategories'
import useDeleteTransaction from 'queries/transactions/useDeleteTransaction'
import useGetBalance from 'queries/transactions/useGetBalance'
import useGetTransactions from 'queries/transactions/useGetTransactions'
import { TransactionTypes } from 'utils/config'
import { cn, formatDate, formatLocalCurrency } from 'utils/helpers'

import TransactionForm from './TransactionForm/TransactionForm'
import UploadModal from './UploadModal/UploadModal'

const HomePage = () => {
  const alerts = useAlerts()
  const { transactions, isError, isLoading } = useGetTransactions()
  const { getAccountById } = useGetAccounts()
  const { getCategoryById } = useGetCategories()
  const { deleteTransaction } = useDeleteTransaction()
  //const { balance } = useGetBalance()
  const { t } = useTranslation()
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleDelete = (id: number) => {
    alerts.confirm(t('transactions.confirmDelete'), () => {
      deleteTransaction(id)
    })
  }

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction)
  }

  const handleClose = () => {
    setShowCreateModal(false)
    setSelectedTransaction(null)
  }
  const columnHelper = createColumnHelper<Transaction>()

  return (
    <AppFrame>
      <div className="flex justify-between">
        <h1 className="font-bold text-xl">{t('transactions.title')}</h1>
        <ul className="flex gap-8 items-center">
          <li>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowCreateModal(true)}
            >
              <PlusSquareSolid />
            </button>
            <button
              className="btn btn-sm btn-ghost"
              onClick={() => setShowModal(true)}
            >
              <UploadSquareSolid />
            </button>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">{t('balance.assets')}:</span>
            <span>{formatLocalCurrency(0)}</span>
          </li>
          <li className="flex gap-2">
            <span className="font-bold">{t('balance.liabilities')}:</span>
            <span>{formatLocalCurrency(0)}</span>
          </li>
          <li>
            <span>{t('balance.total')}:</span>
            <span>{formatLocalCurrency(0)}</span>
          </li>
        </ul>
      </div>
      <div className="my-2 h-[1px] bg-secondary-content w-full" />
      <div className="flex gap-4 items-start mt-4">
        <Table
          data={transactions ?? []}
          columns={[
            {
              id: 'date',
              header: t('transactions.date'),
              render: (row) => formatDate(row.date)
            },
            {
              id: 'about',
              header: t('transactions.type'),
              render: (row) => (
                <div className="flex flex-col">
                  <span className="font-semibold">{row.description}</span>
                  <span
                    className={cn('text-sm text-secondary-content', {
                      ['text-xs']: row.description
                    })}
                  >
                    {getAccountById(row.account as number)?.name}
                  </span>
                </div>
              )
            },
            {
              id: 'category',
              header: t('transactions.category'),
              render: (row) => getCategoryById(row.category as number)?.name
            },
            {
              id: 'amount',
              header: t('transactions.amount'),
              render: (row) => (
                <span
                  className={cn('font-semibold', {
                    ['text-red-500']: row.type === TransactionTypes.EXPENSE,
                    ['text-green-500']: row.type === TransactionTypes.INCOME
                  })}
                >
                  {formatLocalCurrency(row.amount)}
                </span>
              )
            }
          ]}
        />
      </div>
      {showCreateModal && (
        <Modal>
          <TransactionForm
            transaction={selectedTransaction}
            onCancel={handleClose}
          />
        </Modal>
      )}
      {showModal && <UploadModal onClose={() => setShowModal(false)} />}
    </AppFrame>
  )
}

export default HomePage

import { Edit, Trash } from 'iconoir-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import AppFrame from 'frames/AppFrame'
import { Account } from 'models/Account'
import { useAlerts } from 'providers/AlertsProvider'
import useDeleteAccount from 'queries/accounts/useDelelteAccount'
import useGetAccounts from 'queries/accounts/useGetAccounts'

import AccountForm from './AccountForm'

const AccountPage = () => {
  const alerts = useAlerts()
  const { accounts, isError, isLoading } = useGetAccounts()
  const { deleteAccount } = useDeleteAccount()
  const { t } = useTranslation()
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null)

  const handleDelete = (id: number) => {
    alerts.confirm(t('accounts.confirmDelete'), () => {
      deleteAccount(id)
    })
  }

  const handleEdit = (account: Account) => {
    setSelectedAccount(account)
  }

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>
  return (
    <AppFrame>
      <h1 className="font-bold text-xl">{t('accounts.title')}</h1>
      <AccountForm
        account={selectedAccount}
        onReset={() => setSelectedAccount(null)}
      />
      <div className="my-2 h-[1px] bg-secondary-content w-full" />
      <div className="grid grid-cols-4 gap-4 mt-2">
        {accounts?.map((account) => (
          <div key={account.id} className="card border">
            <div className="card-body">
              <h3 className="card-title text-base">{account.name}</h3>
              <div className="card-actions flex justify-end">
                <button className="btn btn-ghost btn-xs">
                  <Edit />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AppFrame>
  )
}

export default AccountPage

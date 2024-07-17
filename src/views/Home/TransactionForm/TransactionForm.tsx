import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DatePicker, Select, TextField } from 'components'
import Button from 'components/Button'
import { Transaction } from 'models/Transaction'
import useGetAccounts from 'queries/accounts/useGetAccounts'
import useGetCategories from 'queries/categories/useGetCategories'
import useCreateTransaction from 'queries/transactions/useCreateTransaction'
import useUpdateTransaction from 'queries/transactions/useUpdateTransaction'
import { TransactionTypes, TransactionTypesOptions } from 'utils/config'

interface TransactionFormProps {
  transaction: Transaction | null
  onCancel: () => void
}

const defaultValues: Transaction = {
  amount: 0,
  date: null,
  description: '',
  type: TransactionTypes.EXPENSE,
  account: '',
  category: '',
  targetAccount: ''
}

const TransactionForm = ({ transaction, onCancel }: TransactionFormProps) => {
  const { t } = useTranslation()
  const { createTransaction, isSuccess } = useCreateTransaction()
  const { updateTransaction, isSuccess: isSuccessUpdated } =
    useUpdateTransaction()
  const { accounts } = useGetAccounts()
  const isUpdate = !!transaction
  const { reset, handleSubmit, watch, control } = useForm<Transaction>({
    defaultValues: transaction ?? defaultValues,
    shouldUnregister: true
  })
  const type = watch('type')
  const { categories } = useGetCategories(type)
  console.log({ categories })

  useEffect(() => {
    if (isSuccess || isSuccessUpdated) {
      handleReset()
    }
  }, [isSuccess, isSuccessUpdated])

  const submitForm = (data: Transaction) => {
    if (isUpdate) {
      updateTransaction(data)
    } else {
      createTransaction(data)
    }
  }

  const handleReset = () => {
    reset(defaultValues)
    onCancel()
  }

  return (
    <div className="w-full rounded-xl">
      <h1 className="font-bold text-lg">Agregar transacción</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <Controller
          control={control}
          name="type"
          rules={{
            validate: (value) => {
              if (value.trim().length === 0) {
                return 'form.errors.required'
              }
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              id={field.name}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(value as TransactionTypes)}
              label={t('transactions.type')}
              options={TransactionTypesOptions.map((option) => ({
                ...option,
                label: t(option.label as string)
              }))}
              showError={!!error}
              error={error?.message && t(error.message)}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          rules={{
            validate: (value) => {
              if (!value) {
                return 'form.errors.required'
              }
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <DatePicker
              name={field.name}
              value={field.value}
              onChange={field.onChange}
              label={t('transactions.date')}
              showError={!!error}
              error={error?.message && t(error.message)}
            />
          )}
        />
        <Controller
          control={control}
          name="account"
          rules={{
            validate: (value) => {
              if (!value) {
                return t('form.errors.required')
              }
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <Select
              id={field.name}
              name={field.name}
              value={field.value?.toString() as string}
              onChange={(value) => field.onChange(Number(value))}
              label={t('transactions.account')}
              options={accounts?.map((account) => ({
                value: account.id?.toString(),
                label: account.name
              }))}
              showError={!!error}
              error={error?.message && t(error.message)}
            />
          )}
        />
        {type === TransactionTypes.TRANSFER && (
          <Controller
            control={control}
            name="targetAccount"
            rules={{
              validate: (value) => {
                if (!value) {
                  return t('form.errors.required')
                }
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <Select
                id={field.name}
                name={field.name}
                value={field.value?.toString() as string}
                onChange={(value) => field.onChange(Number(value))}
                label={t('transactions.targetAccount')}
                options={accounts?.map((account) => ({
                  value: account.id?.toString(),
                  label: account.name
                }))}
                showError={!!error}
                error={error?.message && t(error.message)}
              />
            )}
          />
        )}
        {type !== TransactionTypes.TRANSFER && (
          <Controller
            control={control}
            name="category"
            rules={{
              validate: (value) => {
                if (!value) {
                  return t('form.errors.required')
                }
              }
            }}
            render={({ field, fieldState: { error } }) => (
              <Select
                id={field.name}
                name={field.name}
                value={field.value?.toString() as string}
                onChange={(value) => field.onChange(Number(value))}
                label={t('transactions.category')}
                options={categories?.map((category) => ({
                  value: category.id?.toString(),
                  label: category.name
                }))}
                showError={!!error}
                error={error?.message && t(error.message)}
              />
            )}
          />
        )}
        <Controller
          control={control}
          name="amount"
          rules={{
            validate: (value) => {
              if (!value) {
                return t('form.errors.required')
              }
            }
          }}
          render={({ field, fieldState: { error } }) => (
            <TextField
              type="number"
              id={field.name}
              label={t('transactions.amount')}
              name={field.name}
              value={field.value}
              onChange={(value) => field.onChange(Number(value))}
              showError={!!error}
              error={error?.message && t(error.message)}
            />
          )}
        />
        {type !== TransactionTypes.TRANSFER && (
          <Controller
            control={control}
            name="description"
            render={({ field, fieldState: { error } }) => (
              <TextField
                id={field.name}
                label={t('transactions.description')}
                name={field.name}
                value={field.value}
                onChange={(value) => field.onChange(value as string)}
                showError={!!error}
                error={error?.message && t(error.message)}
              />
            )}
          />
        )}
        <div className="flex justify-between">
          <Button onClick={handleReset} variant="secondary">
            {t('buttons.cancel')}
          </Button>
          <Button type="submit">
            {isUpdate ? t('buttons.update') : t('buttons.save')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm

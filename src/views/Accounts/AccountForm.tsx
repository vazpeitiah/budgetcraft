import { useForm } from '@tanstack/react-form'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import CheckBox from 'components/CheckBox/CheckBox'
import TextField from 'components/TextField/TextField'
import { Account } from 'models/Account'
import useCreateAccount from 'queries/accounts/useCreateAccount'
import useUpdateAccount from 'queries/accounts/useUpdateAccount'

interface AccountFormProps {
  account: Account | null
  onReset: () => void
}

const defaultValues: Account = {
  includeInTotal: true,
  name: '',
  type: null
}

const AccountForm = ({ account, onReset }: AccountFormProps) => {
  const { t } = useTranslation()
  const { createAccount, isSuccess } = useCreateAccount()
  const { updateAccount, isSuccess: isSuccessUpdated } = useUpdateAccount()
  const isUpdate = !!account
  const { Field, Provider, handleSubmit, Subscribe, reset } = useForm<Account>({
    defaultValues: account ?? defaultValues,
    onSubmit: ({ value }) => {
      if (isUpdate) {
        updateAccount(value)
      } else {
        createAccount(value)
      }
    }
  })

  useEffect(() => {
    if (isSuccess || isSuccessUpdated) {
      reset()
      onReset()
    }
  }, [isSuccess, isSuccessUpdated])

  return (
    <Provider>
      <form
        className="flex items-center justify-between gap-8 border"
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          handleSubmit()
        }}
      >
        <Field
          name="name"
          validators={{
            onChange: ({ value }) => {
              if (value.trim().length === 0) {
                return t('form.errors.required')
              }
            }
          }}
          children={(field) => (
            <TextField
              id={field.name}
              label={t('accounts.name')}
              name={field.name}
              value={field.state.value}
              onChange={(value) => field.handleChange(value as string)}
              showError={field.state.meta.touchedErrors.length > 0}
              error={field.state.meta.touchedErrors.toLocaleString()}
            />
          )}
        />
        <Field
          name="includeInTotal"
          children={(field) => (
            <div className="self-center">
              <CheckBox
                id={field.name}
                name={field.name}
                label={t('accounts.includeInTotal')}
                value={field.state.value}
                onChange={field.handleChange}
              />
            </div>
          )}
        />
        <div className="flex justify-between gap-4 self-center">
          <button
            className="btn btn-outline btn-xs"
            type="button"
            onClick={() => {
              onReset()
              reset()
            }}
          >
            {isUpdate ? t('buttons.cancel') : t('buttons.reset')}
          </button>
          <Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <button
                className="btn btn-primary btn-xs self-center"
                type="submit"
                disabled={!canSubmit}
              >
                {isUpdate ? t('buttons.update') : t('buttons.save')}
              </button>
            )}
          />
        </div>
      </form>
    </Provider>
  )
}

export default AccountForm

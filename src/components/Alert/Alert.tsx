import { CheckCircle, WarningCircle, XmarkCircleSolid } from 'iconoir-react'
import { useTranslation } from 'react-i18next'

import Modal from 'components/Modal/Modal'

import styles from './alert.module.css'

export type AlertType = 'success' | 'warning' | 'error' | 'confirm'

interface AlertProps {
  type: AlertType
  message: string
  onClose: () => void
  onConfirm?: () => void
}

const Alert = ({
  type = 'success',
  message,
  onClose,
  onConfirm
}: AlertProps) => {
  const { t } = useTranslation()

  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  return (
    <Modal onClose={onClose} showCloseButton>
      <div className={styles.alert}>
        {type === 'success' && (
          <CheckCircle className="text-success w-20 h-20" />
        )}
        {type === 'warning' && (
          <WarningCircle className="text-warning w-20 h-20" />
        )}
        {type === 'error' && (
          <XmarkCircleSolid className="text-error w-20 h-20" />
        )}
        <p className="text-base font-semibold text-center">{message}</p>
        <div className={styles['alert-controls']}>
          <button className="btn btn-outlined" onClick={onClose}>
            {t('buttons.close')}
          </button>
          {type === 'confirm' && (
            <button className="btn btn-primary" onClick={handleConfirm}>
              {t('buttons.confirm')}
            </button>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default Alert

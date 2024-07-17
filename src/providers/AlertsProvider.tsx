import { createContext, useContext, useState } from 'react'

import Alert, { AlertType } from 'components/Alert/Alert'

interface AlertsContextProps {
  error: (message: string) => void
  warning: (message: string) => void
  success: (message: string) => void
  confirm: (message: string, onConfirm: () => void) => void
}

interface ConfirmData {
  onConfirm: () => void
}

const AlertsContext = createContext<AlertsContextProps>({
  error: () => {},
  warning: () => {},
  success: () => {},
  confirm: () => {}
})

export const AlertsProvider = ({ children }: { children: React.ReactNode }) => {
  const [type, setType] = useState<AlertType>('success')
  const [message, setMessage] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)
  const [confirmData, setConfirmData] = useState<ConfirmData>()

  const handleOpen = (message: string) => {
    setMessage(message)
    setShow(true)
  }

  const error = (message: string) => {
    setType('error')
    handleOpen(message)
  }

  const warning = (message: string) => {
    setType('warning')
    handleOpen(message)
  }

  const success = (message: string) => {
    setType('success')
    handleOpen(message)
  }

  const confirm = (message: string, onConfirm: () => void) => {
    setType('confirm')
    handleOpen(message)
    setConfirmData({ onConfirm })
  }

  return (
    <AlertsContext.Provider value={{ error, warning, success, confirm }}>
      {children}
      {show && (
        <Alert
          type={type}
          message={message}
          onClose={() => setShow(false)}
          onConfirm={confirmData?.onConfirm}
        />
      )}
    </AlertsContext.Provider>
  )
}

export const useAlerts = () => useContext(AlertsContext)

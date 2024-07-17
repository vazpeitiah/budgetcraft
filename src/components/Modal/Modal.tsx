import { useEffect, useRef } from 'react'

import Portal from 'components/Portal/Portal'

import styles from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode
  showCloseButton?: boolean
  onClose?: () => void
}

const Modal = ({ children, showCloseButton, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose?.()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <Portal>
      <main className={styles.overlay}>
        <div className={styles['custom-modal']} ref={modalRef}>
          {showCloseButton && (
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
            </form>
          )}
          {children}
        </div>
      </main>
    </Portal>
  )
}

export default Modal

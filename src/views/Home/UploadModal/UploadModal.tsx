import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import Modal from 'components/Modal/Modal'
import useCreateBatchTransactions from 'queries/transactions/useCreateBatchTransaction'

interface UploadModalProps {
  onClose: () => void
}

const UploadModal = ({ onClose }: UploadModalProps) => {
  const { t } = useTranslation()
  const { createBatchTransactions, isPending, isSuccess } =
    useCreateBatchTransactions()
  const [files, setFiles] = useState<FileList | null>(null)

  const handleUpload = () => {
    const firstFile = files?.item(0)
    if (firstFile) {
      createBatchTransactions(firstFile)
    }
  }

  return (
    <Modal onClose={onClose} showCloseButton>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{t('uploadModal.title')}</h1>
        <p>{t('uploadModal.description')} </p>
        <input
          className="file-input file-input-sm"
          type="file"
          accept=".csv"
          name="file"
          onChange={(e) => setFiles(e.target.files)}
        />
        {isSuccess && (
          <div className="text-green-500">{t('uploadModal.success')}</div>
        )}
        <div className="flex justify-between">
          <button
            className="btn btn-outline btn-sm"
            type="button"
            onClick={onClose}
            disabled={isPending}
          >
            {t('buttons.cancel')}
          </button>
          <button
            className="btn btn-primary btn-sm"
            type="button"
            disabled={isPending || isSuccess}
            onClick={handleUpload}
          >
            {t('buttons.upload')}
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default UploadModal

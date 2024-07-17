interface InputContainerProps {
  id: string
  label: string
  error?: string
  showError?: boolean
  children: React.ReactNode
}

const InputContainer = ({
  id,
  label,
  error,
  showError,
  children
}: InputContainerProps) => {
  return (
    <label className="form-control" htmlFor={id}>
      <div className="label">
        <span className="label-text text-sm">{label}</span>
      </div>
      {children}
      <div className="label">
        {showError && (
          <span className="label-text-alt text-error text-xs">{error}</span>
        )}
      </div>
    </label>
  )
}

export default InputContainer

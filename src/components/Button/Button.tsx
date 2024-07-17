import { cn } from 'utils/helpers'

type Variant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'error'
  | 'warning'
  | 'success'

interface ButtonProps {
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  variant?: Variant
  type?: HTMLButtonElement['type']
}

const Button = ({
  onClick,
  disabled,
  children,
  variant = 'primary',
  type = 'button'
}: ButtonProps) => {
  return (
    <button
      className={cn('btn btn-sm', `btn-${variant}`)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  )
}

export default Button

import InputContainer from 'components/InputContainer/InputContainer'
import { SelectOption } from 'utils/types'

interface SelectProps {
  id: string
  label: string
  name: string
  value: string
  onChange: (value: string) => void
  options: SelectOption[] | undefined
  error?: string
  showError?: boolean
  defaultValue?: string
}

const Select = ({
  id,
  label,
  name,
  value,
  onChange,
  error,
  showError,
  options
}: SelectProps) => {
  return (
    <InputContainer id={id} label={label} showError={showError} error={error}>
      <select
        className="select select-sm select-bordered "
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      >
        <option disabled value="">
          -- Selecciona una opción --
        </option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputContainer>
  )
}

export default Select

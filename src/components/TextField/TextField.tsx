import InputContainer from 'components/InputContainer/InputContainer'

interface TextFieldProps {
  id: string
  label: string
  name: string
  value: string | undefined
  onChange: (value: string | undefined) => void
  placeholder?: string
  error?: string
  showError?: boolean
  type?: React.InputHTMLAttributes<HTMLInputElement>['type']
}

const TextField = ({
  id,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  showError
}: TextFieldProps) => {
  return (
    <InputContainer id={id} label={label} error={error} showError={showError}>
      <input
        id={id}
        type="text"
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input input-sm input-bordered"
      />
    </InputContainer>
  )
}

export default TextField

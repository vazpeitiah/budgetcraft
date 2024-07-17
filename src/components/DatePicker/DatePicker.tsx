import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import InputContainer from 'components/InputContainer/InputContainer'
import { DateFormats } from 'utils/config'

interface DatePickerProps {
  name: string
  value: Date | null
  onChange: (value: Date | null) => void
  label: string
  error?: string
  showError?: boolean
  maxDate?: Date
  dateFormat?: string[]
}

const DatePicker = ({
  name,
  value,
  onChange,
  label,
  error,
  showError,
  maxDate,
  dateFormat = [DateFormats.short]
}: DatePickerProps) => {
  return (
    <InputContainer id={name} label={label} error={error} showError={showError}>
      <ReactDatePicker
        id={name}
        name={name}
        className="input input-sm input-bordered w-full"
        dateFormat={dateFormat}
        placeholderText={dateFormat?.[0]}
        selected={value}
        onChange={onChange}
        autoComplete="off"
        maxDate={maxDate}
      />
    </InputContainer>
  )
}

export default DatePicker

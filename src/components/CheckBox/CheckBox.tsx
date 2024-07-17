interface CheckBoxProps {
  id: string
  label: string
  name: string
  value: boolean
  onChange: (value: boolean) => void
}

const CheckBox = ({ id, label, name, value, onChange }: CheckBoxProps) => {
  return (
    <label htmlFor={id} className="flex gap-1">
      <span className="label-text">{label}</span>
      <input
        id={id}
        type="checkbox"
        className="checkbox checkbox-primary checkbox-sm"
        name={name}
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
      />
    </label>
  )
}

export default CheckBox

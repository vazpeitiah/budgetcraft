interface ToggleProps {
  label?: string
  name?: string
  checked?: boolean
  onChange?: (check: boolean) => void
  disabled?: boolean
}

const Toggle = ({
  label,
  name,
  checked,
  onChange,
  disabled = false
}: ToggleProps) => {
  return (
    <div className="form-control">
      <label className="label cursor-pointer flex gap-2" htmlFor={name}>
        <span className="label-text">{label}</span>
        <input
          id={name}
          name={name}
          type="checkbox"
          className="toggle"
          onChange={(e) => onChange?.(e.target.checked)}
          checked={checked}
          disabled={disabled}
        />
      </label>
    </div>
  )
}

export default Toggle

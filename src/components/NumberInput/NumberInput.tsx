import './NumberInput.css'
export const NumberInput = ({
  value,
  onChange,
  label,
}: {
  value: number
  label: string
  onChange: (value: number) => void
}) => {
  return (
    <div style={{ position: 'relative' }}>
      <label>
        <span className="number-input-label">{label}</span>
        <input
          type="number"
          className="number-input"
          value={value}
          onChange={e => onChange(Number(e.target.value))}
        />
      </label>
    </div>
  )
}

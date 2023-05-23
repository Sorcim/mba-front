type AmountFieldsProps = {
  value: number
}

const AmountField = ({ value }: AmountFieldsProps) => {
  return (
    <span
      className={`font-bold ${value >= 0 ? 'text-green-600' : 'text-red-600'}`}
    >
      {value.toFixed(2)}
    </span>
  )
}

export default AmountField

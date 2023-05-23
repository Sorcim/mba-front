import { DateTime } from 'luxon'

type DateFieldProps = {
  value: string
  format?: string
}

const DateField = ({ value, format }: DateFieldProps) => {
  const date = DateTime.fromISO(value)
  return <p>{date.toFormat(format ?? 'dd-MM-yyyy')}</p>
}

export default DateField

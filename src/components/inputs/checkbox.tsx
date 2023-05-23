import { TransactionType } from '../../types/Transaction'
import { useState } from 'react'
import { DateTime } from 'luxon'

type CheckboxProps = {
  transaction: TransactionType
  afterChange: () => void
}

const Checkbox = ({ transaction, afterChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(!!transaction.checked_at)
  const handleChange = () => {
    fetch(
      `http://localhost:3333/api/v1/account/${transaction.account_id}/transaction/${transaction.id}`,
      {
        method: 'PUT',
        body: JSON.stringify({
          checked_at: !checked
            ? DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
            : null,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    ).then((r) => {
      if (r.ok) {
        setChecked(!checked)
        afterChange()
      }
    })
  }
  return <input type="checkbox" checked={checked} onChange={handleChange} />
}

export default Checkbox

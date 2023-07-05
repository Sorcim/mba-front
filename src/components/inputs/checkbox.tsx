import { TransactionType } from '../../types/Transaction'
import { useState } from 'react'
import { DateTime } from 'luxon'
import useSWRMutation from 'swr/mutation'
import { TransactionApi } from '../../api/TransactionApi.ts'
import HttpClient from '../../api/HttpClient.ts'

type CheckboxProps = {
  transaction: TransactionType
  afterChange: () => void
}

const Checkbox = ({ transaction, afterChange }: CheckboxProps) => {
  const [checked, setChecked] = useState(!!transaction.checked_at)
  const { trigger } = useSWRMutation(
    TransactionApi.url(Number(transaction.account_id), transaction.id).update,
    HttpClient.put
  )
  const handleChange = async () => {
    try {
      await trigger({
        checked_at: !checked
          ? DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss')
          : null,
      })
      setChecked(!checked)
      afterChange()
    } catch (e) {
      console.error(e)
    }
  }
  return <input type="checkbox" checked={checked} onChange={handleChange} />
}

export default Checkbox

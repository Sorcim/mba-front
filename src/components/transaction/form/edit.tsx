import { TransactionType } from '../../../types/Transaction'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import useSWRMutation from 'swr/mutation'
import { TransactionApi } from '../../../api/TransactionApi.ts'
import HttpClient from '../../../api/HttpClient.ts'

type FormTransactionType = {
  transaction: TransactionType
  afterSubmit?: () => void
}

type Inputs = Partial<TransactionType>

const EditFormTransaction = ({
  transaction,
  afterSubmit,
}: FormTransactionType) => {
  const { register, handleSubmit } = useForm<Inputs>()
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const { trigger } = useSWRMutation(
    TransactionApi.url(Number(transaction.account_id), transaction.id).update,
    HttpClient.put
  )
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await trigger(data)
      if (afterSubmit) {
        afterSubmit()
      }
      handleModal()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Description"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('description')}
          defaultValue={transaction.description}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount"
          inputMode="decimal"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('amount')}
          defaultValue={transaction.amount}
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Date"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('date')}
          defaultValue={transaction.date}
        />
      </div>
      <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
        Valider
      </button>
    </form>
  )
}

export default EditFormTransaction

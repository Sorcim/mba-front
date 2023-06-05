import { SubmitHandler, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'
import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { TransactionType } from '../../../types/Transaction'

type FormTransactionProps = {
  afterSubmit?: () => void
  accountId: string
}

type Inputs = Pick<TransactionType, 'amount' | 'description' | 'date'>

const AddFormTransaction = ({
  afterSubmit,
  accountId,
}: FormTransactionProps) => {
  const { register, handleSubmit } = useForm<Inputs>()
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const { mutate } = useSWRConfig()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`http://localhost:3333/api/v1/account/${accountId}/transaction`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    }).then((r) => {
      if (r.status === 401) {
        console.log('error')
      } else {
        mutate(
          `http://localhost:3333/api/v1/account/${accountId}/transaction`
        ).then(() => {
          if (afterSubmit) {
            afterSubmit()
          }
          handleModal()
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Description"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('description')}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Amount"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('amount')}
        />
      </div>
      <div>
        <input
          type="date"
          placeholder="Date"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('date')}
        />
      </div>
      <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
        Valider
      </button>
    </form>
  )
}

export default AddFormTransaction

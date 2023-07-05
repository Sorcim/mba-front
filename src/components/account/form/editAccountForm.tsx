import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { AccountType } from '../../../types/Account'
import useSWRMutation from 'swr/mutation'
import HttpClient from '../../../api/HttpClient.ts'
import { AccountApi } from '../../../api/AccountApi.ts'

type Inputs = Partial<AccountType>
type EditAccountFormProps = {
  account: AccountType
  afterSubmit?: () => void
}
const EditAccountForm = ({ account, afterSubmit }: EditAccountFormProps) => {
  const { register, handleSubmit } = useForm<Inputs>()
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const { trigger } = useSWRMutation(
    AccountApi.url(Number(account.id)).update,
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
          placeholder="Name"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('name')}
          defaultValue={account.name}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Start Balance"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('start_balance')}
          defaultValue={account.start_balance}
        />
      </div>
      <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
        Valider
      </button>
    </form>
  )
}

export default EditAccountForm

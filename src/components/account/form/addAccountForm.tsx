import { SubmitHandler, useForm } from 'react-hook-form'
import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { AccountType } from '../../../types/Account'

type Inputs = Partial<AccountType>
type AddAccountFormProps = {
  afterSubmit?: () => void
}
const AddAccountForm = ({ afterSubmit }: AddAccountFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetch(`http://localhost:3333/api/v1/account/`, {
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
        if (afterSubmit) {
          afterSubmit()
        }
        handleModal()
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input
          type="text"
          placeholder="Name"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('name')}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Start Balance"
          className="w-full py-3 pl-4 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          {...register('start_balance')}
        />
      </div>
      <button className="block w-full mt-3 py-3 px-4 font-medium text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg ring-offset-2 ring-indigo-600 focus:ring-2">
        Valider
      </button>
    </form>
  )
}

export default AddAccountForm

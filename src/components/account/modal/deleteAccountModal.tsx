import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { AccountType } from '../../../types/Account'
import useSWRMutation from 'swr/mutation'
import { AccountApi } from '../../../api/AccountApi.ts'
import HttpClient from '../../../api/HttpClient.ts'

type Props = {
  account: AccountType
  afterDelete: () => void
}

const DeleteAccountModal = ({ account, afterDelete }: Props) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const { trigger } = useSWRMutation(
    AccountApi.url(account.id).delete,
    HttpClient.delete
  )
  const handleDelete = async () => {
    try {
      await trigger()
      if (afterDelete) {
        afterDelete()
      }
      handleModal()
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <p>Confirmer la suppression ?</p>
      <button
        className="px-4 py-2 text-white bg-red-600 rounded-lg duration-150 hover:bg-red-700 active:shadow-lg"
        onClick={() => handleDelete()}
      >
        Supprimer
      </button>{' '}
      <button
        className="px-4 py-2 text-white bg-indigo-600 rounded-lg duration-150 hover:bg-indigo-700 active:shadow-lg"
        onClick={() => {
          handleModal()
        }}
      >
        Annuler
      </button>
    </div>
  )
}

export default DeleteAccountModal

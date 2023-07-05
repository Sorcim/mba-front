import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { ScheduledTransactionType } from '../../../types/ScheduledTransaction'
import useSWRMutation from 'swr/mutation'
import HttpClient from '../../../api/HttpClient.ts'
import { ScheduledTransactionApi } from '../../../api/ScheduledTransactionApi.ts'

type Props = {
  scheduledTransaction: ScheduledTransactionType
  afterDelete: () => void
}

const DeleteScheduledTransactionModal = ({
  scheduledTransaction,
  afterDelete,
}: Props) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType
  const { trigger } = useSWRMutation(
    ScheduledTransactionApi.url(
      scheduledTransaction.account_id,
      scheduledTransaction.id
    ).delete,
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

export default DeleteScheduledTransactionModal

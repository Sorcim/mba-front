import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import { TransactionType } from '../../../types/Transaction'

type Props = {
  transaction: TransactionType
  afterDelete: () => void
}

const DeleteTransactionModal = ({ transaction, afterDelete }: Props) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType

  const handleDelete = (transaction: TransactionType) => {
    fetch(
      `http://localhost:3333/api/v1/account/${transaction.account_id}/transaction/${transaction.id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      }
    ).then((r) => {
      if (r.status === 401) {
        console.log('error')
      } else {
        if (afterDelete) {
          afterDelete()
        }
        handleModal()
      }
    })
  }
  return (
    <div>
      <p>Confirmer la suppression ?</p>
      <button
        className="px-4 py-2 text-white bg-red-600 rounded-lg duration-150 hover:bg-red-700 active:shadow-lg"
        onClick={() => handleDelete(transaction)}
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

export default DeleteTransactionModal

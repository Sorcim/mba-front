import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import DeleteButton from '../../button/deleteButton'

type Props = {
  modalContent: JSX.Element
}
const DeleteModalButton = ({ modalContent }: Props) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType
  return <DeleteButton onClick={() => handleModal(modalContent)} />
}

export default DeleteModalButton

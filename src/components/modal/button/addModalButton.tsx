import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import AddButton from '../../button/addButton'

type AddModelButtonProps = {
  modalContent: JSX.Element
}
const AddModelButton = ({ modalContent }: AddModelButtonProps) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType
  return <AddButton onClick={() => handleModal(modalContent)} />
}

export default AddModelButton

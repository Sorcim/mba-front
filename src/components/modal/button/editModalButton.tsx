import { useContext } from 'react'
import { ModalContext, ModalContextType } from '../../../context/modalContext'
import EditButton from '../../button/editButton'

type Props = {
  modalContent: JSX.Element
}
const EditModalButton = ({ modalContent }: Props) => {
  const { handleModal } = useContext(ModalContext) as ModalContextType
  return <EditButton onClick={() => handleModal(modalContent)} />
}

export default EditModalButton

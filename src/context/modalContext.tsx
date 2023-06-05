import { createContext, PropsWithChildren } from 'react'
import useModal from '../hooks/useModal'
import Modal from '../components/modal/modal'

export type ModalContextType = {
  modal: boolean
  handleModal: (content?: JSX.Element) => void
  modalContent: JSX.Element | undefined
}

const ModalContext = createContext<ModalContextType | null>(null)

const ModalProvider = ({ children }: PropsWithChildren) => {
  const { modal, handleModal, modalContent } = useModal()
  return (
    <ModalContext.Provider value={{ modal, handleModal, modalContent }}>
      <Modal />
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }

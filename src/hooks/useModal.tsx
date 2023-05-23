import { useState } from 'react'

export default () => {
  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState<JSX.Element>(
    <div>empty modal</div>
  )

  const handleModal = (content?: JSX.Element) => {
    setModal(!modal)
    if (content) {
      setModalContent(content)
    }
  }

  return { modal, handleModal, modalContent }
}

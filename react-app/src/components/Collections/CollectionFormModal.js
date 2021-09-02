import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CollectionForm from './CollectionForm'
import "./Collection.css"

function CollectionFormModal() {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button  className="create-collection-button"onClick={() => setShowModal(true)}>Create Collection</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CollectionForm operator={"new"}/>
        </Modal>
      )}
    </>
  )
}

export default CollectionFormModal

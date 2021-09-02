import React, { useState } from 'react'
import { Modal } from '../../context/Modal'
import CollectionForm from './CollectionForm'
import "./Collection.css"

function UpdateCFormModal({collection}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button className="update-collection-button" onClick={() => setShowModal(true)}><i class="far fa-edit"></i></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CollectionForm id={collection.id}/>
        </Modal>
      )}
    </>
  )
}

export default UpdateCFormModal

import React, { useState, useEffect } from 'react'
import { Modal } from '../../context/Modal'
import SignUpForm from './SignUpForm'

function SignupFormModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // showModal
    console.log("aaaaaa")
  },[showModal])

  return (
    <>
      <button onClick={() => setShowModal(!showModal)}>Sign Up</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <SignUpForm />
        </Modal>
      )}
    </>
  )
}

export default SignupFormModal

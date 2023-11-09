import React from 'react';
import './Modal.scss'

const Modal = ({children, setModal}) => {
  return (
    <div className="modal">
      <div className="modal-body">
        <div onClick={() => setModal(false)} className="close">&times;</div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
import React, { useState } from 'react';
import './ModalComponent.css';

const ModalComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
            <h2>Modal Title</h2>
            <p>This is a simple modal. You can put any content here.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalComponent;


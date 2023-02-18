import React from 'react';

export function Alert({ showModal, message, handleYes, handleNo }) {
  if (!showModal) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button onClick={handleYes}>Yes</button>
          <button onClick={handleNo}>No</button>
        </div>
      </div>
    </div>
  );
}


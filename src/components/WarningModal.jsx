import React, { useState } from 'react';

// Modal component
function Modal() {
  const [isVisible, setIsVisible] = useState(true);

  // Event handler to hide the modal when dismissed
  const handleDismiss = () => setIsVisible(false);

  return (
    <>
      {isVisible && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Modal Title</h2>
              <button onClick={handleDismiss}>X</button>
            </div>
            <div className="modal-content">
              <p>Modal Content</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;

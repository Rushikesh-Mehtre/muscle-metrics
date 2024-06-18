// Modal.tsx
import React from 'react';
import './Modal.scss';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onContinue: () => void;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, onContinue }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <p>Do you want to continue?</p>
        </div>
        <div className="modal-body">
          <p>After selecting today's workout it cannot be changed until next day</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose} className="btn-cancel">Cancel</button>
          <button onClick={onContinue} className="btn-continue">Continue</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

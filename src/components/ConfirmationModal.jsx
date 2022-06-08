import React from "react";
import Modal from "react-modal";
import "../components/ConfirmationModal.css"

Modal.setAppElement("#root");

export default function ConfirmationModal(props) {

  return (
    <div className="ConfirmationModal">
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
      >
          <button className="CloseButton" onClick={props.onRequestClose}>
            &times;
          </button>
          <header className="PaymentHeader">
            Recibo de Pagamento
          </header>
          <p className="ConfirmationMessage">
            {props.message}
          </p>
      </Modal>
    </div>
  );
}
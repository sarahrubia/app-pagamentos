import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const PaymentHeader = styled.header`
  background-color: #474a6e;
  color: #fff;
  font-weight: 500;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const ConfirmationMessage = styled.p`
    font-size: 18px;
`;

Modal.setAppElement("#root");

export default function ConfirmationModal(props) {

  return (
    <div className="ConfirmationModal">
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="My Confirmation Modal"
      >
          <PaymentHeader>
            Recibo de Pagamento
          </PaymentHeader>
          <ConfirmationMessage>
            Pagamento realizado com sucesso!
          </ConfirmationMessage>
      </Modal>
    </div>
  );
}
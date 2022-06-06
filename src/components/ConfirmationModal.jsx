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

const CloseButton = styled.button`
  float: right;
  padding-top: 10px;
  padding-right: 15px;
  border: none;
  color: white;
  background-color: transparent;
  font-size: 20px;
}`

Modal.setAppElement("#root");

export default function ConfirmationModal(props) {

  return (
    <div className="ConfirmationModal">
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="My Confirmation Modal"
      >
          <CloseButton onClick={props.onRequestClose}>
            x
          </CloseButton>
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
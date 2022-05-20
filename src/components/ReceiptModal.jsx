import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

const PaymentHeader = styled.header`
  background-color: #474a6e;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const PaymentReceiptMessage = styled.p`
    font-size: 18px;
`;

Modal.setAppElement("#root");

export default function ReceiptModal() {

  return (
    <div className="ReceiptModal">
      <Modal>
          <PaymentHeader>
            Recibo de Pagamento
          </PaymentHeader>
          <PaymentReceiptMessage>
              O pagamento foi concluído com sucesso.
          </PaymentReceiptMessage>
      </Modal>
    </div>
  );
}
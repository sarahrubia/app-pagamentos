import React, { useState } from "react";
import styled from "styled-components";
// import PaymentModal from "./Modal_Payment";
import PaymentModal from "./PaymentModal";

const Button = styled.button`
  margin-right: 0;
  cursor: pointer;
`;

export default function PaymentButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Button className="Botao-pagar" onClick={() => setIsModalVisible(true)}>
        Pagar
      </Button>
      {isModalVisible ? (
        <PaymentModal onClose={() => setIsModalVisible(false)}>
          <header>Pagamento para nome do usuário</header>
        </PaymentModal>
      ) : null}
    </>
  );
}

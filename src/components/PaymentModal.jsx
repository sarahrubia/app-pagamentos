import React, { useState } from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
// import PostForm from "../PostForm";

const Button = styled.button`
  cursor: pointer;

  ${(props) =>
    props.paymentButton &&
    css`
      margin-right: 0;
    `}

  ${(props) =>
    props.closeButton &&
    css`
      float: right;
      padding-top: 10px;
      padding-right: 15px;
      border: none;
      color: white;
      background-color: transparent;
      font-size: 20px;
    `}
`;

const ButtonDiv = styled.div`
  width: 60px;
  margin: 0 auto;
`;

const PaymentHeader = styled.header`
  background-color: #474a6e;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 5px;
`;

const PaymentHeaderUser = styled.span`
  color: yellow;
`;

const PaymentForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const PaymentInput = styled.input`
  margin-bottom: 5px;
  height: 30px;
  border-radius: 5px;
`;

const PaymentSelect = styled.select`
  margin-bottom: 5px;
  height: 30px;
  border-radius: 5px;
`;

Modal.setAppElement("#root");

export default function PaymentModal(props) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleModal() {
    setIsOpen(!isOpen);
  };

  const selectOptions = () => {
    
    let cards = [
      // valid card
      {
        card_number: '1111111111111111',
        cvv: 789,
        expiry_date: '01/18',
      },
      // invalid card
      {
        card_number: '4111111111111234',
        cvv: 123,
        expiry_date: '01/20',
      },
    ];
    
    for (let i = 0; i < cards.length; i++) {
      let selectCard = document.getElementById("selected");
      let option = document.createElement("option");
      let cardNumber = cards[i].card_number;
      option.setAttribute("card_number", cardNumber);
      option.textContent = "Cartão com final " + cardNumber.slice(cardNumber.length - 4);
      selectCard.appendChild(option); 
    }
  }
  

  return (
    <div className="PaymentModal">
      <Button paymentButton onClick={toggleModal}>
        Pagar
      </Button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My Payment Modal"
      >
        <div className="Content">
          <Button closeButton onClick={toggleModal}>
            x
          </Button>
          <PaymentHeader>
            Pagamento para <PaymentHeaderUser>{props.name}</PaymentHeaderUser>
          </PaymentHeader>
          <PaymentForm>
            <PaymentInput type="text" placeholder="R$ 0,00"></PaymentInput>
            <PaymentSelect 
              id="selected">
                {selectOptions()}
            </PaymentSelect>
          </PaymentForm>
          <ButtonDiv>
            <Button>Pagar</Button>
          </ButtonDiv>
        </div>
      </Modal>
    </div>
    
  );
}

import React, { useState } from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
// import axios from 'axios';

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
  // const [paymentInfo, setPaymentInfo] = useState({
  //   destination_user_id: "",
  //   payment_value: "",
  //   card_number: "",
  //   cvv: "",
  //   expiry_date: ""
  // });

  const mask = (e) => {
    e.preventDefault();

    if (/[0-9]+/g.test(e.key) && e.target.value.length < 14) {
      e.target.value += e.key;
    }

    let inputValue = Number(e.target.value.replace(/[^0-9]+/g, ""));
    inputValue = inputValue / 100;
    let inputFormat = inputValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    e.target.value = inputFormat;
  } 

  let cards = [
    // valid card
    {
        card_number: "1111111111111111",
        cvv: 789,
        expiry_date: "01/18",
    },
    // invalid card
    {
        card_number: "4111111111111234",
        cvv: 123,
        expiry_date: "01/20",
    },
];


  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // submitHandler = e => {
  //     e.preventDefault()
  //     console.log(paymentInfo)

  //     axios.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', paymentInfo)
  //       .then(response => {
  //           console.log(response)
  //       })
  //       .catch(error => {
  //           console.log(error)
  //       })
  // }

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
            <PaymentInput 
              type="text" 
              placeholder="R$ 0,00"
              onKeyDown={mask} />
            <PaymentSelect>
            {cards.map((card) => (
                <option key={card.card_number}>Cartão com final {card.card_number.slice(-4)}</option>
            ))}
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
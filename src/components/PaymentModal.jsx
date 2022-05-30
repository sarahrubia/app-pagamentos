import React, { useState } from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
import IntlCurrencyInput from "react-intl-currency-input";
import axios from "axios";

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

// const PaymentInput = styled.input`
//   margin-bottom: 5px;
//   height: 30px;
//   border-radius: 5px;
// `;

const PaymentSelect = styled.select`
  margin-bottom: 5px;
  height: 30px;
  border-radius: 5px;
`;

Modal.setAppElement("#root");

export default function PaymentModal(props) {
  //  Toggle Modal
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  // Cards for Payment

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

  const [payment, setPayment] = useState({
    destination_user_id: "",
    paymentValue: 0,
    cardInfo: {},
  });

  // Currency Mask

  const currencyConfig = {
    locale: "pt-BR",
    formats: {
      number: {
        BRL: {
          style: "currency",
          currency: "BRL",
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      },
    },
  };

  // Post transactions

  const changeHandler = (e, currencyValue, maskedCurrencyValue) => {
    e.preventDefault();

    setPayment({
      ...payment,
      destination_user_id: props.id,
      [e.target.name]: e.target.value,
    });

    console.log(currencyValue); // value without mask (ex: 1234.56)
    console.log(maskedCurrencyValue); // value wit mask (ex: R$ 1234,56)

  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(payment);

    axios
      .post(
        "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
        payment
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <IntlCurrencyInput
              currency="BRL"
              config={currencyConfig}
              value={payment.paymentValue}
              name="paymentValue"
              onChange={changeHandler}
            />
            <PaymentSelect
              name="cardInfo"
              value={payment.cardInfo}
              onChange={changeHandler}
            >
              {cards.map((card) => (
                <option key={card.card_number} value={JSON.stringify(card)}>
                  Cartão com final {card.card_number.slice(-4)}
                </option>
              ))}
            </PaymentSelect>
          </PaymentForm>
          <ButtonDiv>
            <Button onClick={submitHandler}>Pagar</Button>
          </ButtonDiv>
        </div>
      </Modal>
    </div>
  );
}

import React, { useState } from "react";
import Modal from "react-modal";
import styled, { css } from "styled-components";
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
  const [userID, setUserID] = useState("");
  const [paymentValue, setPaymentValue] = useState("R$ 0,00");
  const [cardInfo, setCardInfo] = useState({});

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

  // Currency Mask

  const currencyMask = (e) => {
    e.preventDefault();

    if (/[0-9]+/g.test(e.key) && e.target.value.length < 14) {
      e.target.value += e.key;
    }

    var myInput = Number(e.target.value.replace(/[^0-9]+/g, "") / 100);
    var formatInput = myInput.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });

    console.log(formatInput);

    e.target.value = formatInput;

    setPaymentValue(formatInput);
    setUserID(props.id);
  };

  // Post transactions

  const POSTObject = {
    userID,
    paymentValue,
    cardInfo,
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(POSTObject);

    axios
      .post(
        "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989",
        POSTObject
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
            <PaymentInput
              value={paymentValue}
              name="paymentValue"
              onChange={currencyMask}
            />
            <PaymentSelect
              name="cardInfo"
              value={cardInfo}
              onChange={(e) => {
                e.preventDefault();
                setCardInfo(e.target.value);
              }}
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

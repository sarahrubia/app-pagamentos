import React, { useState } from "react";
import Modal from "react-modal";
import "../components/PaymentModal.css"
import axios from "axios";

// Modal

Modal.setAppElement("#root");

export default function PaymentModal(props) {
  // const [isOpen, setIsOpen] = useState(false);
  const [userID, setUserID] = useState("");
  const [paymentValue, setPaymentValue] = useState("R$ 0,00");
  const [cardInfo, setCardInfo] = useState({});
  const [paymentValueFloat, setPaymentValueFloat] = useState(0);

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

    e.target.value = formatInput;

    setPaymentValue(formatInput);
    setPaymentValueFloat(myInput)
    setUserID(props.id);
  };

  // Post transactions

  const POSTObject = {
    userID,
    paymentValueFloat,
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
        if (response.data.status === "Aprovada") {
          // alert("Sucesso na transação");
          props.setUser({})
          props.setMessage("O pagamento foi concluído com sucesso!")

        } else if (response.data.status !== "Aprovada") {
          // alert("Erro na transação");
          props.setUser({})
          props.setMessage("O pagamento não foi concluído com sucesso")
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="My Payment Modal"
      >
        <div className="Content">
          <button className="CloseButton" onClick={props.onRequestClose}>
            x
          </button>
          <header className="PaymentHeader">
            Pagamento para <span>{props.name}</span>
          </header>
          <form className="PaymentForm" onSubmit={submitHandler}>
            <input
              className="PaymentInput"
              value={paymentValue}
              name="paymentValue"
              onChange={currencyMask}
          />
            <select
              className="PaymentSelect"
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
            </select>
            <div className="ButtonDiv">
              <button type="submit">Pagar</button>
            </div>
          </form>
        </div>
      </Modal>
      </>
  );
}

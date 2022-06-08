import React, { useState } from "react";
import "../components/PaymentModal.css";
import axios from "axios";

// Modal

export default function PaymentModal(props) {
  const [userID, setUserID] = useState("");
  const [paymentValue, setPaymentValue] = useState("R$ 0,00");
  const [cardInfo, setCardInfo] = useState({});
  const [paymentValueFloat, setPaymentValueFloat] = useState(0);

  const handleOutsideClick = (e) => {
    if (e.target.id === "modal") props.isClosed(false);
  };

  const handleResetModal = (e) => {
    props.isClosed(false);
    props.setMessage("") 
  }

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
    setPaymentValueFloat(myInput);
    setUserID(props.selectedUser.id);
  };

  // Post transaction

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
          props.setMessage("O pagamento foi concluído com sucesso!");
        } else if (response.data.status !== "Aprovada") {
          props.setMessage("O pagamento não foi concluído com sucesso");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ModalBackground" id="modal" onClick={handleOutsideClick}>
      {props.message === "" ? (
        <div className="ModalContainer">
          <div className="HeaderDiv">
            <header className="PaymentHeader">
              Pagamento para <span>{props.name}</span>
            </header>
            <button
              className="CloseButton"
              onClick={() => props.isClosed(false)}
            >
              &times;
            </button>
          </div>
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
              // value={cardInfo}
              defaultValue={"default"}
              onChange={(e) => {
                setCardInfo(e.target.value);
              }}
            >
                <option value={"default"} disabled>
                  Escolha um cartão para o pagamento
                </option>
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
      ) : (
        <div className="ModalContainer">
          <div className="HeaderDiv">
            <header className="PaymentHeader">
              Recibo de Pagamento
            </header>
            <button
              className="CloseButton"
              onClick={handleResetModal}
            >
              &times;
            </button>
          </div>
          <p>{props.message}</p>
        </div>
      )}
      ;
    </div>
  );
}

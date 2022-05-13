import React from "react";
// import TesteModal from "./ReactModal";

const PaymentModal = ({ id = "PaymentModal", onClose = () => {} }) => {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) onClose();
  };

  return (
    <div id={id} className="PaymentModal" onClick={handleOutsideClick}>
      <div className="Container"> </div>
      <button className="close" onClick={onClose}>
        x
      </button>
      {/* <TesteModal /> */}
      {/* <div className="Content">
        Pagamento para nome do usuários
        <input type="text" placeholder="R$ 0,00"></input>
        <input type="text" placeholder="Cartão com final"></input>
      </div> */}
    </div>
  );
};

export default PaymentModal;

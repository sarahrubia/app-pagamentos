import React from "react"
import ReactModal from "react-modal"

export default function PaymentModal () {

    return (
        <ReactModal isOpen={true}>
            <div className="Content">
                Pagamento para nome do usuários
                <input type="text" placeholder="R$ 0,00"></input>
                <input type="text" placeholder="Cartão com final"></input>
              </div>    
        </ReactModal>
    )

}

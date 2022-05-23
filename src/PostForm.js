import React, { Component } from "react";
import axios from 'axios';

export default class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card_number: "",
      cvv: "",
      expiry_date: "",
    };
  }

  changeHandler = (e) => {
      this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
      e.preventDefault()
      console.log(this.state)

      axios.post('https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989', this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
  }


  render() {

    // let cards = [
    //   // valid card
    //   {
    //     card_number: '1111111111111111',
    //     cvv: 789,
    //     expiry_date: '01/18',
    //   },
    //   // invalid card
    //   {
    //     card_number: '4111111111111234',
    //     cvv: 123,
    //     expiry_date: '01/20',
    //   },
    // ];
    
    // const selectCard = document.getElementById("selected");
    
    // for (let i = 0; i < cards.length; i++) {
    //   const option = document.createElement("option");
    //   option.setAttribute("card_number", cards[i].card_number);
    //   option.textContent = cards[i].card_number;
    //   selectCard.appendChild(option);
    //   console.log(option);
    // };
    

      // O <option> que devia ser gerado dentro do <select> aparece no console quando o modal já tá aberto. Mas se tiver fechado e clicar em pagar, ele nem abre, a página fica toda em branco.
    
    const { card_number, cvv, expiry_date } = this.state;

    return (
      <>
        <form onSubmit={this.submitHandler}>
          <div>
            <input
              type="text"
              name="card_number"
              value={card_number}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div>
            <input
              type="number"
              name="cvv"
              value={cvv}
              onChange={this.changeHandler}
            ></input>
          </div>
          <div>
            <input
              type="text"
              name="expiry_date"
              value={expiry_date}
              onChange={this.changeHandler}
            ></input>
          </div>
          <button type="submit">Pagar</button>
        </form>
        <select id="selected">
          <option value="default">default</option>
        </select>
      </>
    );
  }
}

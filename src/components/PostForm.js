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

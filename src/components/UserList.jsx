import React, { Component } from "react";

export default class UserList extends Component {

    // Fetching data
    state = {
      data: []
    }
    
    async componentDidMount() {
      
      const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'
    
      const response = await fetch(api)
      console.log("res ", response);     
    
      const body = await response.json();
      console.log("body ", body);

      this.setState({data: body})
    //   Para pegar um dado específico de um usuário:
    //   this.setState({data: body[0]['img']})
    }

    render () {
        return (
            <>
                <div>Listagem de usuários</div>
                <span>{JSON.stringify(this.state.data)}</span>
            </>
        )
    }
}

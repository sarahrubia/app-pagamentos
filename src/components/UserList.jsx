import React, { Component } from "react";
import BotaoPagar from "./BotaoPagar"

export default class UserList extends Component {

    // Fetching data
    state = {
      data: []
    }
    
    async componentDidMount() {
      
      const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'
    
      const response = await fetch(api)
      // console.log("res ", response);     
    
      const body = await response.json();
      // console.log("body ", body);

      this.setState({data: body})
    }

    render () {
        return (
            <>
              {this.state.data.map(user => {
                return (
            <>
              <div>Listagem de usuários</div>
              <img className='Avatar' 
              src={user.img}
              alt="" 
              />
      
              <div className='UserInfo'>
                  <p className='UserInfo-name'>
                      {user.name}
                  </p>
                  <div className='UserIdentifier'>
                      <p className='UserInfo-id'>
                          {user.id}
                      </p>
                      <p className='UserInfo-username'>
                          {user.username}
                      </p>
                  </div>
              </div>
              <BotaoPagar />
              </>
        )

              })}
            </>
        )

    }
}

import React, { Component } from 'react';
import BotaoPagar from '../BotaoPagar';

// Acessar a pasta react-context que tem um exemplo de contexto, paginas, componentes 

export default class UserThree extends Component {
    
    constructor() {
        super();

        this.state = {
            avatarUrl:'https://via.placeholder.com/100',
            name: 'Raquel Regina',
            id: 'Z',
            username: '@raquelregina',
        }
    }

    render () {
        // console.log(this.state)
        return (
            <>
                <img className='Avatar' 
                src={this.state.avatarUrl}
                alt={this.state.name} 
                />
        
                <div className='UserInfo'>
                    <p className='UserInfo-name'>
                        {this.state.name}
                    </p>
                    <div className='UserIdentifier'>
                        <p className='UserInfo-id'>
                            {this.state.id}
                        </p>
                        <p className='UserInfo-username'>
                            {this.state.username}
                        </p>
                    </div>
                </div>
                <BotaoPagar />
            </>
        )
    }
}


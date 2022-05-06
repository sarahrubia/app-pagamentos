import React, { Component } from 'react';

function BotaoPagar () {
    return (
        <button className='Botao-pagar'>
            Pagar
        </button>
    )
}

export default class Account extends Component {
    
    // constructor (props) {
    //     super(props)

    //     this.state = {
    //         avatarUrl:'https://via.placeholder.com/100',
    //         name: 'Sarah Rúbia de Oliveira Santos',
    //         id: 'X',
    //         username: '@sarahrubia',
    //     }
    // }
    
    render () {

        return (
        <>
            <img className='Avatar' 
            src={this.props.avatarUrl}
            alt={this.props.name} 
            />
    
            <div className='UserInfo'>
                <p className='UserInfo-name'>
                    {this.props.name}
                </p>
                <div className='UserIdentifier'>
                    <p className='UserInfo-id'>
                        {this.props.id}
                    </p>
                    <p className='UserInfo-username'>
                        {this.props.username}
                    </p>
                </div>
            </div>
            <BotaoPagar />
        </>
        )
    }
}

import React, { Component } from "react";
import styled from "styled-components";

const Avatar = styled.img`
width: 100%;
max-width: 100px;
border-radius: 50%;
`
const AccountWrapper = styled.div`
width: 50%;
margin: auto;
display: flex;
flex-direction: row;
padding: 20px 40px;
align-items: center;
background-image: linear-gradient(to bottom right, #2E3148, #2A2C3F);
font-family: Helvetica;
font-size: 18px;
font-weight: bold;
color: white;
border-bottom: 1px solid white;
`

const UserInfoName = styled.p`
margin: 0;
`

const UserInfo = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding: 20px;
`

const UserIdentifier = styled.p`
margin: 0;
padding: 0;
`


const Button = styled.button`
margin-right: 0;
`

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
                    <AccountWrapper>
                        <Avatar className='Avatar' 
                        src={user.img}
                        alt="" 
                        />
                
                        <UserInfo className='UserInfo'>
                            <UserInfoName className='UserInfo-name'>
                                {user.name}
                            </UserInfoName>
                            <UserIdentifier className='UserIdentifier'>
                                ID: {user.id} - Username: {user.username}
                            </UserIdentifier>
                        </UserInfo>
                        <Button className='Botao-pagar'>
                            Pagar
                        </Button>
                    </AccountWrapper>
                )
            })}
            </>
        )

    }
}

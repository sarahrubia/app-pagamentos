import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaymentButton from "./PaymentButton"
// import IUser from "../interfaces/"

// Styled-Components

const Avatar = styled.img`
  width: 100%;
  max-width: 100px;
  border-radius: 50%;
`;
const AccountWrapper = styled.div`
  width: 50%;
  margin: auto;
  display: flex;
  flex-direction: row;
  padding: 20px 40px;
  align-items: center;
  background-image: linear-gradient(to bottom right, #2e3148, #2a2c3f);
  font-family: Helvetica;
  font-size: 18px;
  font-weight: bold;
  color: white;
  border-bottom: 1px solid white;
`;

const UserInfoName = styled.p`
  margin: 0;
`;

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const UserIdentifier = styled.p`
  margin: 0;
  padding: 0;
`;


// interface IUser {
//     id: number;
//     name: string;
//     img: string;
//     username: string;
// }

// export default class UserList (extends Component) {

//     // Fetching data
//     state = {
//       data: []
//     }

//     async componentDidMount() {

//       const api = 'https://www.mocky.io/v2/5d531c4f2e0000620081ddce'

//       const response = await fetch(api)
//       // console.log("res ", response);

//       const body = await response.json();
//       // console.log("body ", body);

//       this.setState({data: body})
//     }

//     const [isModalVisible, setIsModalVisible] = useState(false);

//     render () {

//         return (
//             <>
//             {this.state.data.map(user => {
//                 return (
//                     <AccountWrapper>
//                         <Avatar className='Avatar'
//                         src={user.img}
//                         alt=""
//                         />

//                         <UserInfo className='UserInfo'>
//                             <UserInfoName className='UserInfo-name'>
//                                 {user.name}
//                             </UserInfoName>
//                             <UserIdentifier className='UserIdentifier'>
//                                 ID: {user.id} - Username: {user.username}
//                             </UserIdentifier>
//                         </UserInfo>
//                         <Button className='Botao-pagar'
//                         onClick= {() => setIsModalVisible(true)}
//                         >
//                             Pagar
//                         </Button>
//                         {isModalVisible ? <h1>Modal</h1> : null}
//                     </AccountWrapper>
//                 )
//             })}
//             </>
//         )

//     }
// }

export default function UserList() {


  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
      .then((res) => {
        console.log(res);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {users.map((user) => {
        return (
          <AccountWrapper>
            <Avatar className="Avatar" src={user.img} alt="" />

            <UserInfo className="UserInfo">
              <UserInfoName className="UserInfo-name">{user.name}</UserInfoName>
              <UserIdentifier className="UserIdentifier">
                ID: {user.id} - Username: {user.username}
              </UserIdentifier>
            </UserInfo>
            <PaymentButton></PaymentButton>
          </AccountWrapper>
        );
      })}
    </>
  );
}

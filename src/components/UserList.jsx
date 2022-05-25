import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PaymentModal from "./PaymentModal";

// Styled-Components

const Avatar = styled.img`
  width: 100%;
  max-width: 100px;
  border-radius: 50%;
`;
const AccountWrapper = styled.div`
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

export default function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://www.mocky.io/v2/5d531c4f2e0000620081ddce")
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {users.map((user) => {
        return (
          <AccountWrapper key={user.id}>
            <Avatar className="Avatar" src={user.img} alt="" />

            <UserInfo className="UserInfo">
              <UserInfoName className="UserInfo-name">{user.name}</UserInfoName>
              <UserIdentifier className="UserIdentifier">
                ID: {user.id} - Username: {user.username}
              </UserIdentifier>
            </UserInfo>
            <PaymentModal name={user.name}/>
          </AccountWrapper>
        );
      })
      }
    </>
  );
}
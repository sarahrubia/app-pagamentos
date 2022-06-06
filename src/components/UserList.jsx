import React, { useState, useEffect } from "react";
import "../components/UserList.css"
import axios from "axios";
import PaymentModal from "./PaymentModal";
import ConfirmationModal from "./ConfirmationModal";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [message, setMessage] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleOpenModal(user) {
    setModalIsOpen(true);
    setSelectedUser(user)
  }

  function handleCloseModal() {
    setModalIsOpen(false);
  }

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
          <div className="AccountWrapper" key={user.id}>
            <img className="Avatar" src={user.img} alt="" />
            <div className="UserInfo">
              <p className="UserInfoName">{user.name}</p>
              <p className="UserIdentifier">
                ID: {user.id} - Username: {user.username}
              </p>
            </div>
            <button className="PaymentButton" onClick={() => handleOpenModal(user)}>Pagar</button>
          </div>
        );
      })}
      {selectedUser.id && <PaymentModal
          isOpen={modalIsOpen}
          onRequestClose={handleCloseModal}
          name={selectedUser.name}
          id={selectedUser.id}
          setMessage={setMessage}
          setUser={setSelectedUser}
        />
      }
      {message && !selectedUser.id &&
        <ConfirmationModal 
          isOpen={modalIsOpen} 
          onRequestClose={handleCloseModal} 
          setMessage={setMessage} />
      }
    </>
  );
}
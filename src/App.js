import "./App.css";
import React, { useState, useEffect } from "react";
import AddContact from "./components/AddContact/AddContact";
import AllContacts from "./components/AllContacts/AllContacts";
import FilterContacts from "./components/FilterContacts/FilterContacts";
import Alert from "./components/Alert/Alert";
import { CSSTransition } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { getUserOperation } from "./redux/operation/itemsOperation";

function App() {
  const [showAlert, setShowAlert] = useState({ status: false, text: "" });

  const contacts = useSelector((state) => state.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOperation());
  }, [dispatch]);

  return (
    <div className="container">
      <CSSTransition in={true} appear={true} timeout={500} classNames="title">
        <h1 className="title">Phonebook</h1>
      </CSSTransition>
      <AddContact setShowAlert={setShowAlert} />
      {contacts.length >= 2 && <FilterContacts />}

      {contacts.length > 0 && <AllContacts />}

      <CSSTransition
        in={showAlert.status}
        timeout={250}
        classNames="alert"
        mountOnEnter
        unmountOnExit
      >
        <Alert showAlert={showAlert.text} />
      </CSSTransition>
    </div>
  );
}

export default App;

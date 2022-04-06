import React, { useEffect, useRef, useState } from "react";
import { getContacts } from "../../services/cordova.service";
import { formatPhone } from "../../helpers/phone";
import {
  addChannelToUser,
  userExists,
  findUser,
  sendMessage,
} from "../../services/firebase.service";
import { useCookies } from "react-cookie";
import getFilteredContacts from "../../services/getFilteredContacts";
import { Button, Form, Stack } from "react-bootstrap";
import Alert from "../Alert/Alert";
import { useLocation } from "react-router-dom";

const loadContacts = async (props) => {
  const result = await getFilteredContacts();
  return result.map((contact) => {
    const formattedPhone = formatPhone(contact.phoneNumbers[0].value);
    return (
      <option key={formattedPhone} value={formattedPhone}>
        {formattedPhone} - {contact.displayName}
      </option>
    );
  });
};
function AddUsers(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const initalState = {
    contacts: null,
  };
  const location = useLocation();
  const channelId = location.pathname.split("/")[2];
  const [state, setState] = useState(initalState);
  const [contacts,setContacts] = useState(null)
  const [alert,setAlert] = useState(false);
  const selectRef = useRef();
  
  useEffect(async () => {
    if (contacts == null) {
      let _contacts = await loadContacts(props);
      _contacts = await Promise.all(_contacts);
      console.clear();
      console.table(_contacts);
      setContacts(_contacts);
    }
  }, [contacts]);


  const handleSelect = (e) => {
    setState({
      ...state,
      user: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await findUser(cookies.user);
    await user[0].channels.forEach(async (channel) => {
      if(channel.channel == channelId)
      {
        await addChannelToUser(state.user, channelId, channel.name);
        const addedUser = await findUser(selectRef.current.value);
        await sendMessage({id : channelId},cookies.user,"message",`${addedUser[0].nom} ${addedUser[0].prenom} has joined the group`);
      } 
    });

    setAlert(true);

  };

  return (
    <div>
      <Stack>
        {
          alert ? 
          <Alert variant="success" heading={"uttilisateur ajoute au groupe"}
        message={"celui ci a maintenant access a cette discussion"}/>
        : null
        }
        <div>
          <Form.Select
            aria-label="Default select example"
            onChange={(e) => handleSelect(e)}
            ref={selectRef}
          >
            <option>Open this select menu</option>
            {contacts}
          </Form.Select>
        </div>
        <div className="mt-2">
          <Button
            style={{
              width: "100%",
            }}
            onClick={(e) => handleSubmit(e)}
            variant={"secondary"}
          >
            Ajouter
          </Button>
        </div>
      </Stack>
    </div>
  );
}

export default AddUsers;

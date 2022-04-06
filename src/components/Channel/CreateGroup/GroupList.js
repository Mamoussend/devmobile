import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { formatPhone } from "../../../helpers/phone";
import { getContacts } from "../../../services/cordova.service";
import { createChannel,addChannelToUser } from "../../../services/firebase.service";
import getFilteredContacts from "../../../services/getFilteredContacts";
import CheckUser from "./CheckUser";

function GroupList() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [disableBtn,setDisableBtn] = useState(false);

  const navigate = useNavigate();
  const initialState = {
    contactsRaw: [],
    contacts: [],
    group: [],
    channelName: "",
  };
  const [state, setState] = useState(initialState);
  const [group, setGroup] = useState([]);
  useEffect(async () => {
    const contacts = await getFilteredContacts();
    setState({
      ...state,
      contactsRaw: contacts,
    });
  }, []);

  const handleChange = (phone, checked) => {
    phone = formatPhone(phone);
    let _group = group;
    if (checked) {
      _group.push(formatPhone(phone));
    } else {
      _group = _group.splice(_group.indexOf(phone), 1);
    }
    setGroup(_group);
  };

  useEffect(() => {
    console.log(group);
  }, [group]);

  useEffect(() => {
    if (state.contactsRaw) {
      const result = state.contactsRaw.map((contact) => {
        if (formatPhone(contact.phoneNumbers[0].value) == cookies.user) {
          return null;
        }
        return <CheckUser contact={contact} handleChange={handleChange} />;
      });
      setState({
        ...state,
        contacts: result,
      });
    }
  }, [state.contactsRaw]);

  const handleSubmit = async (e) => {
    setDisableBtn(true);
    const channel = await createChannel(
      formatPhone(cookies.user),
      group,
      "group"
    );
    let _group = group;
    _group.push(formatPhone(cookies.user));
    const promises = _group.map(async phone => {
      return await addChannelToUser(formatPhone(phone),channel.id,state.channelName)
    })
    await Promise.all(promises);
    setDisableBtn(false);
    return navigate(`/channel/${channel.id}`);
  };

  useEffect(()=>{
    console.log(state);
  },[state]);
  return (
    <div>
      <Form>{state.contacts}</Form>
      <hr />

      <>
        <Form.Label htmlFor="text">Nom du groupe</Form.Label>
        <Form.Control
          onInput={(e) => {
            setState({
              ...state,
              channelName: e.target.value,
            });
          }}
          type="text"
          id="text"
          aria-describedby="text"
          value={state.channelName}
        />
        <Form.Text id="text" muted>
          le nom du groupe
        </Form.Text>
      </>

      <hr />
      <Button
      disabled={disableBtn}
        style={{
          width: "100%",
        }}
        onClick={(e) => handleSubmit(e)}
      >
        Creer Groupe
      </Button>
    </div>
  );
}

export default GroupList;

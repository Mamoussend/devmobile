import {
  faArrowUp,
  faCircleArrowUp,
  faPlus,
  faGear,
  faMicrophone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { FormControl, Button, InputGroup } from "react-bootstrap";
import { sendMessage } from "../../../services/firebase.service";
import Audio from "./Audio";
import Upload from "./Upload";
function ChatInput(props) {
  const [state, setState] = useState({
    message: "",
  });

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(props.channelId, props.user, "message", state.message);
    setState({
      ...state,
      message: "",
    });
  };

  return (
    <div>
      <InputGroup>
        <FormControl
          onInput={(e) => handleInput(e)}
          placeholder="message"
          name="message"
          classes=""
          aria-label="Recipient's username with two button addons"
          value={state.message}
        />
        <Button
          variant="outline-secondary"
          onClick={(e) => handleSendMessage(e)}
        >
          <FontAwesomeIcon
            icon={faCircleArrowUp}
            style={{ color: "#00b236" }}
          />
        </Button>
        <Upload channelId={props.channelId} />
        <Audio channelId={props.channelId} />
        <Button
          style={{
            cursor: "pointer",
          }}
          variant="outline-secondary"
          onClick={(e) => props.setShowUserAdder(!props.showUserAdder)}
        >
          <FontAwesomeIcon icon={faGear} style={{ color: "grey" }} />
        </Button>
      </InputGroup>
    </div>
  );
}

export default ChatInput;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import {
  createChannel,
  findChannel,
  isChannelMember,
} from "../../services/firebase.service";
import { Container, Button, Stack } from "react-bootstrap";
import ChatInput from "./ChatInput/ChatInput";
import "./Channel.css";
import Conversation from "./Conversation/Conversation";
import Message from "./Message/Message";
import Comment from "./Comment/Comment";
import ChannelName from "./ChannelName/ChannelName";
import UserAdder from "./UserAdder/UserAdder";

function Channel() {
  const channelId = useParams("id");
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const navigate = useNavigate();
  const initialState = {
    channel: null,
    messages: null,
  };
  const [state, setState] = useState(initialState);
  const [messages, setMessages] = useState(null);
  const [isGroup, setIsgroup] = useState(false);

  useEffect(async () => {
    const result = await isChannelMember(channelId.id, cookies.user);
    if (result == false) {
      return navigate("/");
    }
  }, []);

  useEffect(async () => {
    const channel = await findChannel(channelId.id);
    setState({
      ...state,
      channel: channel,
    });
  }, []);

  useEffect(async () => {
    const interval = setInterval(async () => {
      const messages = await findChannel(channelId.id);
      if (messages) {
        updateMessage(messages.messages);
      }
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const updateMessage = (msgs) => {
    let arr = msgs.map((message, index) => {
      let scrollToMsg = false;
      if(index == msgs.length -1)
      {
        scrollToMsg = true;
      }
      let classes = "";
      if (cookies.user == message.from) {
        classes += "from-me";
      } else {
        classes += "from-them";
      }
      return (
        <Message
          channelId={channelId.id}
          text={message.text}
          raw={message}
          type={message.type}
          classes={classes}
          scrollToMsg={scrollToMsg}
        />
      );
    });

    setMessages(arr);
  };

  const [showUserAdder, setShowUserAdder] = useState(false);

  useEffect(() => {}, [state]);

  return (
    <Container className="mt-5">
      <Stack>
        <div
          style={{ maxHeight: "80vh", overflow: "scroll", overflowX: "hidden" }}
        >
          <Conversation>
            <ChannelName channelId={channelId} channel={state.channel} />
            {messages}
          </Conversation>
        </div>
        <ChatInput
          channelId={channelId}
          channel={state.channel}
          user={cookies.user}
          onClick={(e) => setShowUserAdder(!showUserAdder)}
          showUserAdder={showUserAdder}
          setShowUserAdder={setShowUserAdder}
        />
        <UserAdder
          showUserAdder={showUserAdder}
          setShowUserAdder={setShowUserAdder}
          show={showUserAdder}
          channel={state.channel}
          channelId={channelId}
        />
      </Stack>
    </Container>
  );
}

export default Channel;

import React, { useEffect, useState, useRef } from "react";
import { findUser, getUserId, renameChannel } from "../../../services/firebase.service";
import {useCookies} from "react-cookie";

function ChannelName(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  let renderCount = useRef(0);
  const initialState = {
    channelName: "",
  };

  const [state, setState] = useState(initialState);

  useEffect(() => {
    renderCount.current += 1;
  }, [state]);

  const handleInput = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const changeName = setTimeout(async () => {
      if (renderCount.current > 2) {
          console.log("renaming");
          const userId = await getUserId(cookies.user);
        await renameChannel(userId,props.channelId,cookies.user,state.channelName);
      }
    }, 3000);

    return () => {
      clearTimeout(changeName);
    };
  }, [state.channelName]);

  useEffect(async ()=>{
      const user = await findUser(cookies.user);
      user[0].channels.forEach(channel => {
          console.log(channel);
          if(props.channelId.id == channel.channel)
          {
              setState({
                  ...state,
                  channelName : channel.name
              })
          }
      })
  },[]);

  return (
    <p className="comment">
      <input
        style={{
          border: "none",
          padding: "10px",
        }}
        type="text"
        name="channelName"
        className="channelNameInput"
        placeholder="ChannelName"
        onInput={(e) => handleInput(e)}
        defaultValue={state.channelName}
      />
    </p>
  );
}

export default ChannelName;

import React, { useEffect, useRef, useState } from "react";

function Message({ classes, text, type, channel, raw,scrollToMsg }) {
  const [message, setMessage] = useState();
  const msgRef = useRef();

  useEffect(()=>{
    if(scrollToMsg)
    {
      console.log("last message,scrolling into view");
      msgRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  },[scrollToMsg]);

  useEffect(() => {
    console.log(channel, raw);
    console.log(classes, text, type);
    if (type == "image") {
      setMessage(
        <p className={`${classes} image no-tail`}>
          <img
            src={text}
            style={{
              borderRadius: "15px",
              maxWidth: "150px",
              width: "-webkit-fill-available",
            }}
          />
        </p>
      );
    }
    if (type == "video") {
      setMessage(
        <p className={`${classes} image no-tail`}>
          <video width="320" height="240" controls>
            <source src={text} type="video/mp4" />
          </video>
        </p>
      );
    }
    if (type == "audio") {
      setMessage(
        <p className={`${classes} image no-tail`}>
          <audio
            src={text}
            controls
            style={{
              width: "250px",
            }}
          >
            Your browser does not support the audio element.
          </audio>
        </p>
      );
    }
    if (type != "image" && type != "audio" && type != "video") {
      setMessage(<p class={classes}>{text}</p>);
    }
  }, []);
  return <>
  <p 
  class="msg-wrapper"
  style={{
    background : "white",
    display : "grid",
    gridTemplateColumns : classes.includes("from-them") ? "50px auto" : "auto 50px" ,
    maxWidth : "100%",
    width : "auto",
    alignItems : "center",
    padding : 0
  }}
  className={`${classes} no-tail msg-contained`}
  ref={msgRef}
  >
    <div style={{
      marginRight : "10px",
      paddingBottom : "20px"
    }}>
    {message}
    </div>
    <div className="msg-image">
    <img
    style={{
        width : "40px",
        height :  "40px",
        borderRadius : "50px",
      }}
      src={raw.userInfo.pp}
      alt={"test"}
      >
      </img>
      <div style={{
        color : "#bababa",
        fontSize : "13px",
        float : classes.includes("from-them")? "left" : "right",
        fontStyle : "italic",
        marginTop : "5px"
      }}>
        {raw.userInfo.nom}
      </div>
    </div>
  </p>
  </>;
}

export default Message;

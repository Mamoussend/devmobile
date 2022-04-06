import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { uploadImage } from "../../../services/image.firebase.service";
import "./Audio.css";
import { useCookies } from "react-cookie";
import { sendMessage } from "../../../services/firebase.service";
import { async } from "@firebase/util";
import { useReactMediaRecorder } from "react-media-recorder";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faMicrophone } from "@fortawesome/free-solid-svg-icons";

function Audio(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true, video: false });

  useEffect(async () => {
    if (mediaBlobUrl) {
      const config = { responseType: "blob" };
      const result = await axios.get(mediaBlobUrl, config);
      const audioname = `${cookies.user}${new Date().toISOString()}.mp3`;
      uploadImage(audioname, result.data, (data) => {
        if (data.imageURL) {
          console.log(data.imageURL);
          sendMessage(props.channelId, cookies.user, "audio", data.imageURL);
        }
      });
    }
  }, [mediaBlobUrl]);

  useEffect(() => {
    console.log(status);
  }, [status]);

  return (
    <>
      <div
        style={{
          backgroundColor: "#fc037b",
          width: 20,
          height: 20,
          position: "fixed",
          left: "10px",
          top: "10px",
          borderRadius: "50%",
          display: status == "recording" ? "initial" : "none",
        }}
        className={status == "recording" ? "ping" : null}
      ></div>
      <Button
        // onTouchEnd={(e) => stopRecording(e)}
        // onTouchStart={(e) => startRecording(e)}
        // onMouseDown={(e) => startRecording(e)}
        // onMouseUp={(e) => stopRecording(e)}
        style={{
          cursor: "pointer",
        }}
        onClick={(e) =>
          status == "recording" ? stopRecording(e) : startRecording(e)
        }
        variant="outline-secondary"
      >
        <FontAwesomeIcon icon={faMicrophone} style={{ color: status == "recording" ? "rgb(255 0 118)" : "rgb(0, 178, 54)" }} />
      </Button>
    </>
  );
}

export default Audio;

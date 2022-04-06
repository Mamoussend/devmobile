import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { uploadImage } from "../../../services/image.firebase.service";
import "./Audio.css";
import { useCookies } from "react-cookie";
import { sendMessage } from "../../../services/firebase.service";
import { async } from "@firebase/util";
function Audio(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const initialState = {
    recording: false,
    stream: null,
    chunks: [],
    audioURL: null,
  };

  const [state, setState] = useState(initialState);
  const [audio, setAudio] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);

  const startRecording = (e) => {
    try {
      mediaRecorder.start();
      // checkRecorder();
      setState({
        ...state,
        recording: true,
      });
    } catch (e) {
      setState({
        ...state,
        recording: false,
      });
    }
  };

  const stopRecording = (e) => {
    mediaRecorder.stop();
    // checkRecorder();
    setState({
      ...state,
      recording: false,
    });
  };

  useEffect(async () => {
    if (!mediaRecorder) {
      navigator.mediaDevices.enumerateDevices().then(async (devices) => {
        console.log(devices);
        devices = devices.filter((d) => d.kind === "audioinput");
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            deviceId: devices[0].deviceId,
          },
        });
        setMediaRecorder(new MediaRecorder(stream));
      });
    }
  }, [mediaRecorder]);

  useEffect(() => {
    if (mediaRecorder) {
      mediaRecorder.addEventListener("dataavailable", function (e) {
        if (e.data.size > 0) {
          let temp = state.chunks;
          setState({
            ...state,
            chunks: temp.push(e.data),
          });
        }
      });

      mediaRecorder.addEventListener("stop", (e) => {
        const blob = new Blob(state.chunks, { type: "audio/ogg; codecs=opus" });
        setState({
          ...state,
          chunks: [],
        });
        setAudio(blob);
      });
    }
  }, [mediaRecorder]);

  useEffect(() => {
    if (audio != null) {
      console.log(1);
      const audioname = `${cookies.user}${new Date().toISOString()}.mp3`;
      uploadImage(audioname, state.audio, (data) => {
        if (data.imageURL) {
          console.log(data.imageURL);
          sendMessage(props.channelId,cookies.user,"audio",data.imageURL);
        }
      });
      setState(initialState);
      setAudio(null);
    }
  }, [audio]);

  useEffect(() => {
    console.log(state,mediaRecorder,audio);
  }, [state,mediaRecorder,audio]);

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
          display: state.recording ? "initial" : "none",
        }}
        className={state.recording ? "ping" : null}
      ></div>
      <Button
        // onTouchEnd={(e) => stopRecording(e)}
        // onTouchStart={(e) => startRecording(e)}
        // onMouseDown={(e) => startRecording(e)}
        // onMouseUp={(e) => stopRecording(e)}
        onClick={(e)=> state.recording ? stopRecording(e) : startRecording(e)}
        variant="outline-secondary"
      >
        {
          state.recording ? "Stop" : "Audio"
        }
      </Button>
    </>
  );
}

export default Audio;

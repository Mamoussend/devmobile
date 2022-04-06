import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { uploadImage } from "../../../services/image.firebase.service";
import { sendMessage } from "../../../services/firebase.service";
import { useCookies } from "react-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faImage } from "@fortawesome/free-solid-svg-icons";

function Upload(props) {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const input = useRef();
  const initialState = {
    file: null,
    type : "image"
  };
  const [state, setState] = useState(initialState);

  const handleFileUpload = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log(file);
      if (file.type.split("/")[0] == "image") {
        console.log("uploading file");
        uploadImage(file.name, file, (data) => {
          setState({
            ...state,
            ...data,
            type : "image"
          });
        });
      }
      if (file.type.split("/")[0] == "video") {
        console.log("uploading file");
        uploadImage(file.name, file, (data) => {
          setState({
            ...state,
            ...data,
            type : "video"
          });
        });
      }
    }
  };

  useEffect(() => {
    if (state.imageURL) {
      sendMessage(props.channelId,cookies.user,state.type,state.imageURL);
    }
  }, [state]);

  return (
    <div>
      <input
        type="file"
        multiple={false}
        onInput={(e) => handleFileUpload(e)}
        style={{ display: "none" }}
        ref={input}
      />
      <Button
        variant="outline-secondary"
        onClick={(e) => input.current.click()}
      >
        <FontAwesomeIcon icon={faImage} style={{ color: "rgb(0, 178, 54)" }} />
      </Button>
    </div>
  );
}

export default Upload;

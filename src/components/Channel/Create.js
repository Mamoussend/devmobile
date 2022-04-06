import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { createChannel } from "../../services/firebase.service";
import {Button,Container,Spinner} from "react-bootstrap";
function Create() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [searchParams] = useSearchParams();
  const member = searchParams.get("member");
  const id = useParams("id");
  const navigate = useNavigate();

  useEffect(async () => {
    const owner = cookies.user;
    const channel = await createChannel(owner, member);
    return navigate(`/channel/${channel.id}`);
  }, []);

  return (
    <Container>
      {/* <Button variant="primary" disabled>
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        Loading...
      </Button> */}
    </Container>
  );
}

export default Create;

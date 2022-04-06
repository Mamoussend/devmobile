import { computeHeadingLevel } from "@testing-library/react";
import React from "react";
import {Alert} from "react-bootstrap";

function ShowAlert({heading,message,variant = "danger"}) {
  return (
    <Alert variant={variant} dismissible>
      <Alert.Heading>{heading}</Alert.Heading>
      <p>
        {message}
      </p>
    </Alert>
  );
}

export default ShowAlert;

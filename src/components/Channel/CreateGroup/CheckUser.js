import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";

function CheckUser(props) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    console.log(checked);
    props.handleChange(props.contact.phoneNumbers[0].value,checked);
  }, [checked]);
  return (
    <Form.Check
      onClick={(e) => setChecked(!checked)}
      checked={checked}
      type="switch"
      id="custom-switch"
      label={`${props.contact.displayName}-${props.contact.phoneNumbers[0].value}`}
    />
  );
}

export default CheckUser;

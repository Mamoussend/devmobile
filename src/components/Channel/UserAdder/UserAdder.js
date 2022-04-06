import React, { useEffect, useState } from "react";
import OffCanvas from "../../OffCanvas/OffCanvas";
import Settings from "../../ChatSettings/Settings";

function UserAdder(props) {
  return (
    <OffCanvas
      name={"Parametres du canal"}
      placement="bottom"
      show={props.show}
      onHide={(e) => props.setShowUserAdder(false)}
      style={{
        borderTopLeftRadius: "17px",
        borderTopRightRadius: "17px",
        height: "85vh",
      }}
    >
      <Settings />
    </OffCanvas>
  );
}

export default UserAdder;

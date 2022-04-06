import { Button } from "react-bootstrap";
import React,{useState} from "react";
import OffCanvas from "../../OffCanvas/OffCanvas";
import GroupList from "./GroupList";
function CreateGroup() {
    const [show,setShow] = useState(false);
  const initialState = {
    showModal: false,
  };
  return (
    <div>
      <OffCanvas
        name={"Creer un groupe"}
        placement="bottom"
        show={show}
        onHide={(e)=>setShow(false)}
        style={{
          borderTopLeftRadius: "17px",
          borderTopRightRadius: "17px",
          height: "85vh",
        }}
      >
        <GroupList/>
      </OffCanvas>
      <Button onClick={(e)=>setShow(true)} style={{ width: "100%" }}>Create Group</Button>
    </div>
  );
}

export default CreateGroup;

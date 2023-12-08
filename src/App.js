import React,{Fragment} from "react";
import CustomizedDialogs from "./Componenets/Dialog/dialog";
import { Modal } from "react-bootstrap";
function App() {
  return (
    <>
    <CustomizedDialogs>
      <Modal/>
    </CustomizedDialogs>
    </>
  );
}

export default App;



import React from "react";
import "./Alert.css";

export default function DetailsPopUp(props) {
  return (
    <div className="dialog-message">
      {props.children}
      <div className="button-container">
        <button className="button cancel" onClick={props.cancelClicked}>
          Cancel
        </button>
        <button className="button confirm" onClick={props.confirmClicked}>
          {props.buttonName}
        </button>
      </div>
    </div>
  );
}

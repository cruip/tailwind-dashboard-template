import React from "react";
import "./Alert.css";

export default function Alert(props) {
  return (
    <div className="dialog-message">
      <p className="Message-text">
        {props.message ? props.message : "Do you really want to delete it?"}
      </p>
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

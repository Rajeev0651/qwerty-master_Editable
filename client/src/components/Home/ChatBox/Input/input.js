import React from "react";
import TextField from "@material-ui/core/TextField";
import "./input.css";
import { Socket } from "socket.io-client";

function Input(props) {
  return (
    <form className="form">
      <TextField
        className="input"
        id="outlined-basic"
        label="type..."
        autoComplete="off"
        variant="outlined"
        value={props.message}
        onChange={(event) => props.setMessage(event.target.value)}
        onKeyPress={(event) =>
          event.key === "Enter" ? props.sendMessage(event) : null
        }
      />
      <button
        className="sendButton"
        onClick={(event) => props.sendMessage(event)}
      >
        Send
      </button>
    </form>
  );
}

export default Input;

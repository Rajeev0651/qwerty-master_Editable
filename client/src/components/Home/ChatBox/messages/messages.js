import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./message/message";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import { css } from "glamor";


const ROOT_CSS = css({
  height: 550,
});

const Messages = ({ messages, name }) => {
  return (
    <ScrollToBottom className={ROOT_CSS}>
      <Grid
        item
        xs={12}
        xm={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
      >
        {messages.map((message, i) => (
          <Grid key={i}>
            <Message message={message} name={name} />
          </Grid>
        ))}
      </Grid>
    </ScrollToBottom>
  );
};
export default Messages;

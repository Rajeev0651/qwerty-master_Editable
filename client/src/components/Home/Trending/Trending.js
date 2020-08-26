import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  table: {
    width: 200,
  },
});

function createData(name, value) {
  return { name, value };
}

const rows = [1, 2];
function Trending() {
  const classes = useStyles();
  const [trend_heading, settrendheading] = useState([]);
  const [trend_viewers, settrendviewers] = useState([]);

  useEffect(() => {
    let url = "https://localhost:5000/trending";
    fetch(url, {
      method: "GET",
      mode: "cors",
      withCredentials: true,
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.content);
        for(let i=0; i<data.content.length; i+=2)
        {
          settrendheading((trend_heading) => [...trend_heading, data.content[i]]);
        settrendviewers((trend_viewers) => [
          ...trend_viewers,
          data.content[i+1],
        ]);
        }
        
      });
  }, []);
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Topic</TableCell>
            <TableCell align="right">Engagement</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {trend_heading.map((data, index) => (
            <TableRow key={data}>
              <TableCell component="th" scope="row">
                {data}
              </TableCell>
              <TableCell align="right">{trend_viewers[index]} M</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Trending;

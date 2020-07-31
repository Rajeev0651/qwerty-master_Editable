import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  table: {
    width: 200,
  },
});

function createData(name, value) {
  return { name, value};
}

const rows = [
  createData('Google', 5),
  createData('Yahoo', 4),
  createData('Uber', 3),
  createData('Tesle', 2),
  createData('StartUps', 1),
];

function Trending() {
  const classes = useStyles();
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
        {rows.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.value} M</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

export default Trending;

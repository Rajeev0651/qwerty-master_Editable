import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: "none",
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    display: "flex",
  },
  toolbar: {
    flexWrap: "wrap",
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
}));

const Heading = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Grid>
      <CssBaseline />
      <AppBar
        position="relative"
        color="default"
        elevation={0}
        className={classes.appBar}
        palette="dark"
      >
        <Toolbar className={classes.toolbar}>
        <Grid item xs={12} sm={4} md={6} lg={8} xl={9}>
          <Typography
            variant="h6"
            color="default"
            noWrap
            className={classes.toolbarTitle}
          >
            Company name
          </Typography>
          </Grid>
          <Grid item xs={0} sm={8} md={6} lg={4} xl={3}>
            <nav>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                Features
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                Enterprise
              </Link>
              <Link
                variant="button"
                color="textPrimary"
                href="#"
                className={classes.link}
              >
                Support
              </Link>
            </nav>
          </Grid>
        </Toolbar>
      </AppBar>
      </Grid>
    </React.Fragment>
  );
};

export default Heading;

import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

import CreateBoardDialog from "./CreateBoardDialog";
import LoadBoardDialog from "./LoadBoardDialog";
import hero from "../../assets/hero.jpg";
import { Hero } from "../styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    minHeight: "100vh",
  },
  greetingText: {
    margin: theme.spacing(2),
    color: "white",
  },
  subtitleText: {
    marginBottom: theme.spacing(2),
    color: "white",
  },
  button: {
    marginButton: theme.spacing(2),
  },
}));

export default function HomePage() {
  const classes = useStyles();

  return (
    <Hero img={hero}>
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.greetingText}>
            Welcome to Retro.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="center"
          >
            <Grid item>
              <CreateBoardDialog />
            </Grid>
            <Grid item>
              <LoadBoardDialog />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Hero>
  );
}

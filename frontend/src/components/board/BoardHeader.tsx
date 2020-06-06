import React from "react";
import { Grid, Typography, makeStyles } from "@material-ui/core";

type BoardHeaderProps = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  boardTitle: {
    margin: theme.spacing(2),
  },
}));

export default function BoardHeader({ title }: BoardHeaderProps) {
  const classes = useStyles();

  return (
    <Grid item xs={12} className={classes.boardTitle}>
      <Typography variant="h5">{title}</Typography>
    </Grid>
  );
}

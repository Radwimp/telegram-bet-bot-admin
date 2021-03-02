import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    ...theme.typography.button,
    backgroundColor: theme.palette.background,
    padding: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Control = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid xs={2} align="start">
        <Typography
          className={classes.button}
          variant="h5"
          component="h2"
          align="start"
        >
          Send daily bonus
        </Typography>
      </Grid>
      <Grid align="start">
        <Grid container xs={3} direction="row" justify="start">
          <TextField
            type="number"
            label="Points"
            variant="outlined"
            margin="dense"
          />
        </Grid>
        <Grid direction="row">
          <Button
            variant="contained"
            size="medium"
            color="primary"
            className={classes.button}
          >
            Send Daily Points
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default Control;

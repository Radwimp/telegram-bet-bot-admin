import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  input: {
    width: 'auto',
    marginBottom: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const Control = () => {
  const classes = useStyles();

  return (
    <div>
      ДЕЙЛИ БОНУС
      <Grid>
        <Grid
          container
          spacing={1}
          item
          xs={12}
          direction="row"
          justify="flex-start"
        >
          <TextField
            id="outlined-basic"
            label="Points"
            variant="outlined"
            size="small"
            margin="dense"
            className={classes.input}
          />
          <Grid container spacing={1} item xs={2}>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              className={classes.button}
            >
              Send Points
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Control;

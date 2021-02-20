import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@material-ui/core';
import sendDailyBonus from './utils/sendDailyBonus';

const DailyBonus = () => {
  const [bonus, setBonus] = useState(100);

  return (
    <>
      <Grid item>
        <Typography variant="h5">
          <b>Daily Bonus</b>
        </Typography>
      </Grid>
      <Grid item>
        <TextField
          fullWidth
          type="number"
          label="Bonus amount"
          variant="outlined"
          size="small"
          value={bonus}
          onChange={e => setBonus(+e.target.value)}
        />
      </Grid>
      <Grid item>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => sendDailyBonus(bonus)}
        >
          Send daily bonus
        </Button>
      </Grid>
    </>
  );
};

export default DailyBonus;

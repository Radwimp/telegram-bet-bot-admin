import React from 'react';
import Grid from '@material-ui/core/Grid';

/** Components */
import DailyBonus from '../../components/DailyBonus';

const Control = () => (
  <Grid container>
    <Grid container item xs={2} direction="column" spacing="2">
      <DailyBonus />
    </Grid>
  </Grid>
);

export default Control;

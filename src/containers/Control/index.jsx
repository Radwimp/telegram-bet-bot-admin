import React from 'react';
import Grid from '@material-ui/core/Grid';

/** Components */
import DailyBonus from '../../components/DailyBonus';
import Message from '../../components/Message';

const Control = () => (
  <Grid container spacing="6" direction="column">
    <Grid container item lg={3} xl={2} direction="column" spacing="2">
      <DailyBonus />
    </Grid>
    <Grid container item lg={5} direction="column" spacing="2">
      <Message />
    </Grid>
  </Grid>
);

export default Control;

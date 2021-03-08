import React from 'react';
import useSWR from 'swr';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, TextField, Switch } from '@material-ui/core';

/** Components */
import Message from '../../components/Message';
import getBaseUrl from '../../common/utils/getBaseUrl';

const useStyles = makeStyles(theme => ({
  message: {
    paddingTop: theme.spacing(3),
  },
  status: {
    paddingBot: theme.spacing(3),
  },
}));

const Season = ({ match }) => {
  const classes = useStyles();
  const {
    params: { id },
  } = match;
  const { data, error } = useSWR(`${getBaseUrl()}/tournaments/${id}`);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Grid container>
      <Grid
        container
        xs={6}
        align="center"
        direction="column"
        alignItems="center"
        justify="space-evenly"
      >
        <Grid item>
          <Typography variant="h4" component="h2">
            {data.name}
          </Typography>
        </Grid>
        <Grid item>
          <Grid item className={classes.message}>
            <Typography variant="h6" component="h2">
              PM ID: {data.pmId}
            </Typography>
          </Grid>
          <Grid item>
            {data.psId && (
              <Typography variant="h6" component="h2">
                PS ID: {data.psId}
              </Typography>
            )}
            <Grid item className={classes.message}>
              <Typography variant="h5" component="h2" align="center">
                Статус сезона
              </Typography>
            </Grid>
          </Grid>
          <Grid>
            <Grid container direction="row" justify="space-evenly">
              <Grid item>
                <Typography variant="h5" component="h2">
                  InActive
                </Typography>
              </Grid>
              <Grid item>
                <Switch color="primary" />
              </Grid>
              <Grid item>
                <Typography variant="h5" component="h2">
                  Active
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            justify="space-around"
          >
            <Grid container direction="row" spacing={4}>
              <Grid item>
                <TextField
                  label="Дата начала сезона"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item>
                <TextField
                  label="Дата конца сезона"
                  type="datetime-local"
                  defaultValue="2017-05-24T10:30"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.message}>
          <Message />
        </Grid>
      </Grid>
      <Grid container xs={1} />

      <Grid container xs={4}>
        <Grid item>
          <Typography variant="h4" component="h2">
            Описание турнира
          </Typography>
          <Typography variant="h6" component="h2">
            Стадия Play-In: Сетка double-eliminationb. Открывающие матчи
            best-of-1 Все последующие матчи best-of-3(до двух побед). Восемь
            лучших команд проходят в групповой этап. Групповой этап: Формат —
            двойной double-elimination (GSL). В каждой группе по восемь команд
            Все матчи best-of-3(до двух побед). Три лучших коллектива из каждой
            группы проходят в плей-офф Победители групповой стадии попадут в
            полуфиналы. Вторые места групповой стадии попадут в четвертьфиналы с
            высшим посевом. Третьи места групповой стадии попадут в
            четвертьфиналы с низшим посевом. Плей-офф: Сетка single-elimination
            Четвертьфиналы и полуфиналы best-of-3(до двух побед). Гранд-финал
            best-of-5(до трех побед).
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Season;

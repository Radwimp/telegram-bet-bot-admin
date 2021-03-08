import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

/* Utils */
import getBaseUrl from '../../common/utils/getBaseUrl';

/* Components */
import EnhancedTable from '../../components/EnhancedTable';

const headCells = [
  { id: 'name', label: 'Name', type: 'link' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'endDate', label: 'End Date', type: 'date' },
  { id: 'pmId', label: 'Parimatch ID', type: 'id' },
  { id: 'isActive', label: 'Active', type: 'switch' },
  { id: 'actions', label: 'Actions', type: 'actions' },
];

const formatSeasons = tournaments =>
  tournaments.map(tournament => ({
    ...tournament,
    // eslint-disable-next-line no-underscore-dangle
    id: tournament._id,
    startDate: dayjs(tournament.startDate).format('DD.MM.YY - HH:mm'),
    endDate: dayjs(tournament.endDate).format('DD.MM.YY - HH:mm'),
    // eslint-disable-next-line no-underscore-dangle
    link: `seasons/${tournament._id}`,
  }));

const Seasons = () => {
  const [seasons, setSeasons] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/tournaments`)
      .then(res => setSeasons(formatSeasons(res.data)));
  }, []);

  return (
    seasons.length && (
      <EnhancedTable
        name="Seasons"
        headCells={headCells}
        initialRows={seasons}
        handleCreate={console.log}
        handleDelete={console.log}
        handleUpdate={console.log}
      />
    )
  );
};

export default Seasons;

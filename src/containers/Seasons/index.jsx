import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

/* Utils */
import getBaseUrl from '../../common/utils/getBaseUrl';

/* Components */
import EnhancedTable from '../../components/EnhancedTable';

const headCells = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'startDate', label: 'Start Date', type: 'date' },
  { id: 'endDate', label: 'End Date', type: 'date' },
  { id: 'pmId', label: 'Parimatch ID', type: 'id' },
  { id: 'isActive', label: 'Active', type: 'switch' },
  { id: 'actions', label: 'Actions', type: 'actions' },
];

const formatTournaments = tournaments =>
  tournaments.map(tournament => ({
    ...tournament,
    id: tournament.pmId,
    startDate: dayjs(tournament.startDate).format('DD.MM.YY - HH:mm'),
    endDate: dayjs(tournament.startDate).format('DD.MM.YY - HH:mm'),
  }));

const Seasons = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/tournaments`)
      .then(res => setTournaments(formatTournaments(res.data)));
  }, []);

  return (
    tournaments.length && (
      <EnhancedTable
        name="Seasons"
        headCells={headCells}
        initialRows={tournaments}
        handleCreate={console.log}
        handleDelete={console.log}
        handleUpdate={console.log}
      />
    )
  );
};

export default Seasons;

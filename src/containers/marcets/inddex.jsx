import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

/* Utils */
import getBaseUrl from '../../common/utils/getBaseUrl';

/* Components */
import EnhancedTable from '../../components/EnhancedTable';

const headCells = [
  { id: 'name', label: 'Name', type: 'text' },
  { id: 'date', label: 'Date', type: 'text' },
  { id: 'status', label: 'Status', type: 'text' },
  { id: 'tournament', label: 'Tournament', type: 'text' },
  { id: 'actions', label: 'Actions', type: 'actions' },
];

const formatMarkets = matches =>
  matches.map(match => ({
    ...match,
    id: match._id,
    tournament: match.tournament.name,
    date: dayjs(match.date).format('DD.MM.YY - HH:mm'),
  }));

const Markets = () => {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/matches`)
      .then(res => setMarkets(formatMarkets(res.data)));
  }, []);

  return (
    markets.length && (
      <EnhancedTable
        name="Matches"
        headCells={headCells}
        initialRows={markets}
        handleCreate={console.log}
        handleDelete={console.log}
        handleUpdate={console.log}
      />
    )
  );
};

export default Markets;

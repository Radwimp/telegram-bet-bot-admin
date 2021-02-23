import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

const formatStats = stats =>
  stats.map(stat => ({
    ...stat,
  }));

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/stats`)
      .then(res => setStats(formatStats(res.data)));
  }, []);

  return (
    stats.length && (
      <EnhancedTable
        name="Stats"
        headCells={headCells}
        initialRows={stats}
        handleCreate={console.log}
        handleDelete={console.log}
        handleUpdate={console.log}
      />
    )
  );
};

export default Stats;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* Utils */
import getBaseUrl from '../../common/utils/getBaseUrl';

/* Components */
import EnhancedTable from '../../components/EnhancedTable';

const headCells = [
  { id: 'telegramId', label: 'Telegram ID', type: 'id' },
  { id: 'username', label: 'Username', type: 'text' },
  { id: 'telegramUsername', label: 'Telegram username', type: 'text' },
  { id: 'points', label: 'Points', type: 'text' },
  { id: 'actions', label: 'Actions', type: 'actions' },
];

const formatUsers = users =>
  users.map(user => ({ ...user, id: user.telegramId }));

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(`${getBaseUrl()}/users`)
      .then(res => setUsers(formatUsers(res.data)));
  }, []);

  return (
    users.length && (
      <EnhancedTable
        name="Users"
        headCells={headCells}
        initialRows={users}
        handleCreate={console.log}
        handleDelete={console.log}
        handleUpdate={console.log}
      />
    )
  );
};

export default Users;

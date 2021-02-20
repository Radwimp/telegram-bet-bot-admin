import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import getBaseUrl from '../../common/utils/getBaseUrl';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${getBaseUrl()}/api/users`).then(res => setUsers(res.data));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Telegram username</TableCell>
            <TableCell align="right">Telegram id</TableCell>
            <TableCell align="right">username</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.username}>
              <TableCell component="th" scope="row">
                {user.telegramUsername}
              </TableCell>
              <TableCell align="right">{user.telegramId}</TableCell>
              <TableCell align="right">{user.username}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Users;

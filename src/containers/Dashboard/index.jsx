import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography } from '@material-ui/core';

/* Utils */
import getBaseUrl from '../../common/utils/getBaseUrl';

const Stats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get(`${getBaseUrl()}/stats`).then(res => setStats(res.data));
  }, []);

  return <Typography>{stats}</Typography>;
};

export default Stats;

import axios from 'axios';
import getBaseUrl from 'common/utils/getBaseUrl';

const sendDailyBonus = async amount => {
  await axios.post(`${getBaseUrl()}/users/dailyBonus`, {
    amount,
  });
};

export default sendDailyBonus;

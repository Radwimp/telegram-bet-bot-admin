import React from 'react';
import EmojiEventsRoundedIcon from '@material-ui/icons/EmojiEventsRounded';
import SportsEsportsRoundedIcon from '@material-ui/icons/SportsEsportsRounded';
import DashboardRoundedIcon from '@material-ui/icons/DashboardRounded';
import SwapHorizRoundedIcon from '@material-ui/icons/SwapHorizRounded';
import MoneyRoundedIcon from '@material-ui/icons/MoneyRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';

/* Components */
import SidebarItem from '../../components/SidebarItem';

const ListItems = () => {
  return (
    <div>
      <SidebarItem
        label="Dashboard"
        to="/dashboard"
        Icon={DashboardRoundedIcon}
      />
      <SidebarItem
        label="Control"
        to="/control"
        Icon={ContactMailRoundedIcon}
      />
      <SidebarItem label="Users" to="/users" Icon={PeopleAltRoundedIcon} />
      <SidebarItem
        label="Matches"
        to="/matches"
        Icon={SportsEsportsRoundedIcon}
      />
      <SidebarItem
        label="Seasons"
        to="/seasons"
        Icon={EmojiEventsRoundedIcon}
      />
      <SidebarItem label="Bets" to="/bets" Icon={MoneyRoundedIcon} />
      <SidebarItem
        label="Transactions"
        to="/transactions"
        Icon={SwapHorizRoundedIcon}
      />
    </div>
  );
};

export default ListItems;

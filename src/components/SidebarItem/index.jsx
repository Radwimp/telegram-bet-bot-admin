import React from 'react';
import PropTypes from 'prop-types';
import { Link, useRouteMatch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles({
  listItem: {
    paddingLeft: 22,
    color: props => (props.color === 'primary' ? '#3f51b5' : 'inherit'),
  },
});

const SidebarItem = ({ label, to, Icon }) => {
  const color = useRouteMatch({ path: to, exact: true })
    ? 'primary'
    : 'inherit';
  const classes = useStyles({ color });

  return (
    <ListItem className={classes.listItem} button component={Link} to={to}>
      <Tooltip title={label} aria-label={label.toLowerCase()}>
        <ListItemIcon>
          <Icon color={color} />
        </ListItemIcon>
      </Tooltip>
      <ListItemText primary={label} />
    </ListItem>
  );
};

SidebarItem.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  Icon: PropTypes.func.isRequired,
};

export default SidebarItem;

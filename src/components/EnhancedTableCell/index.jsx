import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import TableCell from '@material-ui/core/TableCell';
import Chip from '@material-ui/core/Chip';
import Switch from '@material-ui/core/Switch';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const getColor = () => 'primary';

const EnhancedTableCell = ({
  cell,
  row,
  handleUpdate,
  handleOpenModal,
  handleDeleteItems,
}) => {
  switch (cell.type) {
    case 'id':
      return (
        <TableCell id={cell.id} component="th" scope="row">
          {row.id}
        </TableCell>
      );
    case 'chip':
      return (
        <TableCell>
          {Array.isArray(row[cell.id]) ? (
            row[cell.id].map(chip => (
              <Chip color={getColor(row[cell.id])} label={chip} key={chip} />
            ))
          ) : (
            <Chip color={getColor(row[cell.id])} label={row[cell.id]} />
          )}
        </TableCell>
      );
    case 'switch':
      return (
        <TableCell>
          <Switch
            checked={row[cell.id]}
            onChange={e =>
              handleUpdate(row.id, { isActive: e?.target.checked })
            }
            color="primary"
          />
        </TableCell>
      );
    case 'actions':
      return (
        <TableCell key={cell.id}>
          <Tooltip title="Edit">
            <IconButton
              size="small"
              aria-label="edit"
              onClick={() => handleOpenModal(row)}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton
              size="small"
              aria-label="delete"
              onClick={() => handleDeleteItems([row.id])}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </TableCell>
      );
    default:
      return <TableCell key={cell.id}>{row[cell.id]}</TableCell>;
  }
};

EnhancedTableCell.propTypes = {
  cell: PropTypes.shape({ type: PropTypes.string, id: PropTypes.string })
    .isRequired,
  row: PropTypes.shape({ id: PropTypes.string }).isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleOpenModal: PropTypes.func.isRequired,
  handleDeleteItems: PropTypes.func.isRequired,
};

export default EnhancedTableCell;

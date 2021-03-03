import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

/* Components */
// import TableModal from '../TableModal';
import EnhancedTableHead from '../EnhancedTableHead';
import EnhancedTableToolbar from '../EnhancedTableToolbar';
import EnhancedTableCell from '../EnhancedTableCell';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(200),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

const EnhancedTable = ({
  name,
  headCells,
  initialRows,
  // modalFields,
  handleCreate,
  handleUpdate,
  handleDelete,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  // const buttonStyles = useStylesButton();
  // const modalStyles = useStylesModal();
  // const [searchValue, setSearchValue] = useState('');

  const handleOpenModal = row => {
    setModalData(row);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleRequestSort = (_event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAll = event => {
    if (event.target.checked) {
      const newSelecteds = initialRows.map(n => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleSelect = (_event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteItems = ids => {
    ids.forEach(id => {
      handleDelete(id);
      setSelected(prevSelected => prevSelected.filter(n => n !== id));
    });
  };

  const isSelected = id => selected.includes(id);

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, initialRows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <EnhancedTableToolbar
        name={name}
        numSelected={selected.length}
        handleAdd={() => handleOpenModal({})}
        handleDelete={() => handleDeleteItems(selected)}
        // searchValue={searchValue}
        // setSearchValue={handleSearch}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label={`${name} table`}
        >
          <EnhancedTableHead
            classes={classes}
            headCells={headCells}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAll}
            onRequestSort={handleRequestSort}
            rowCount={initialRows.length}
          />
          <TableBody>
            {stableSort(initialRows, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                const isItemSelected = isSelected(row.id);

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={event => handleSelect(event, row.id)}
                      />
                    </TableCell>
                    {headCells.map(cell => {
                      return (
                        <EnhancedTableCell
                          key={cell.id}
                          cell={cell}
                          row={row}
                          handleUpdate={handleUpdate}
                          handleOpenModal={handleOpenModal}
                          handleDeleteItems={handleDeleteItems}
                        />
                      );
                    })}
                  </TableRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
        component="div"
        count={initialRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      {/* <TableModal
        name={name}
        open={modalOpen}
        handleClose={handleCloseModal}
        handleCreate={handleCreate}
        handleUpdate={handleUpdate}
        rowData={modalData}
        modalFields={modalFields}
      /> */}
    </div>
  );
};

EnhancedTable.propTypes = {
  name: PropTypes.string.isRequired,
  headCells: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  initialRows: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  handleCreate: PropTypes.func.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  // modalFields: PropTypes.shape({}).isRequired,
};

export default EnhancedTable;

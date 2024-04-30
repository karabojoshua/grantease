import { CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination'; // Import TablePagination
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import PrimarySearchAppBar from '../../components/app-bar';
import { getQuery } from '../../dataprovider';
import { CenteredLayout } from '../../layouts';


// Define your list of applications
// const applicationsList = [];

export const UserApplications = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { data, isError, isLoading } = getQuery('user/applications');
  if (isLoading) {
    return <CenteredLayout extras={{ "data-testid": "loading-page" }}><CircularProgress /></CenteredLayout>
  };
  if (isError) {
    Navigate("/error");
  };
  // const {user} = useClerk();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <PrimarySearchAppBar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="90vh" // 90% of viewport height
      >
        <Paper elevation={3} style={{ width: '90%', maxWidth: '800px' }}>
          <Typography variant="h6" component="div" align="center" gutterBottom>
            Applications
          </Typography>
          {data.length === 0 ? ( // Check if applicationsList is empty
            <Typography variant="body1" align="center">
              No applications available.
            </Typography>
          ) : (
            <div style={{ maxHeight: '400px', overflow: 'auto' }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name of the Company</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowsPerPage > 0
                      ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      : data
                    ).map(application => (
                      <TableRow key={application.applicant_id}>
                        <TableCell>{application.title}</TableCell>
                        <TableCell>{application.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </Box>
  );
};

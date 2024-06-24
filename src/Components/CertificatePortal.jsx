import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import '../Styles/CertificatePortalStyle.css';
import GlobalTheme from '../Themes/GlobalTheme';

const columns = [
  { id: 'name', label: 'Name', minWidth: 100 },
  { id: 'faculty_id', label: 'Faculty ID', minWidth: 80 },
  { id: 'certificate_name', label: 'Certificate Name', minWidth: 100 },
  { id: 'view', label: 'View', minWidth: 50 },
];

const CertificatePortal = () => {

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = useState([])

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getCertificateData = () => {
    axios.get('https://faculty-certificate-server.vercel.app/retrieve')
      .then(response => {
        console.log(response.data)
        setRows(response.data);
      })
      .catch(error => {
        console.error('Error fetching faculty data:', error);
      });
  }

  useEffect(() => {
    getCertificateData();
  }, [])
  return (
    <div className="data-container" style={{fontFamily:GlobalTheme.fontFamily}}>
      <h3>Faculty Certificate Portal</h3>
      <Paper sx={{ width: '90%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, backgroundColor: GlobalTheme.backgroundColor, color: GlobalTheme.color, fontFamily: GlobalTheme.fontFamily }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.faculty_id}</TableCell>
                      <TableCell>{row.certificate_name}</TableCell>
                      <TableCell>
                        <a style={{ backgroundColor: GlobalTheme.backgroundColor, color: GlobalTheme.color }} className='links' href={row.certificate_url} target='blank'>view</a>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

export default CertificatePortal;
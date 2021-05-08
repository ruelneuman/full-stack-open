import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const UserList = () => {
  const users = useSelector((state) => {
    return state.users.users.sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    });
  });
  const status = useSelector((state) => state.users.status);

  if (status === 'failed') return <div>Error: Could not load users</div>;

  if (status === 'loading') return <div variant="body1">Loading...</div>;

  return (
    <>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table size="small" aria-label="Users Table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Blogs Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow key={user.id}>
                  <TableCell component={Link} to={`/users/${user.id}`}>{user.name}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserList;
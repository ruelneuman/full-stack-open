import React from 'react';
import { useSelector } from 'react-redux';

const UserList = () => {
  const users = useSelector((state) => {
    return state.users.users.sort((a, b) => {
      return b.blogs.length - a.blogs.length;
    });
  });
  const status = useSelector((state) => state.users.status);

  if (status === 'failed') return <div>Error: Could not load users</div>;

  if (status === 'loading') return <div>Loading...</div>;

  return (
    <div className="user-list">
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {

  const USERS = [
    {
      id: 'u1',
      name: 'Andrea Piacquadio',
      image: "https://github.com/Tasups/images/blob/main/Andrea%20Piacquadio.jpg?raw=true",
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
}

export default Users
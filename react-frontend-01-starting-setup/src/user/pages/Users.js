import React from 'react'

import UsersList from '../components/UsersList'

const Users = () => {

  const USERS = [
    {
      id: 'u1',
      name: 'Emily Schwarz',
      image: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      places: 3
    }
  ];

  return <UsersList items={USERS} />;
}

export default Users
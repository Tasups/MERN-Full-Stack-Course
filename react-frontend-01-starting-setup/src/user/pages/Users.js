import React, { useEffect, useState } from 'react'

import ErrorModal from '../../shared/components/UIElements/ErrorModal'
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner'
import UsersList from '../components/UsersList'

const Users = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()
  const [loadedUsers, setLoadedUsers] = useState()

  // useEffect doesn't like Promises, its just a bad idea put it within another code block within useEffect
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setLoadedUsers(responseData.users);
      } catch (error) {
        setError(error.message)
      }
      setIsLoading(false);
    }
    sendRequest()
  }, [])

  const errorHandler = () => {
    setError(null)
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && <div className="center">
        <LoadingSpinner />
      </div>}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
}

export default Users
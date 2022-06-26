import React, { useEffect, useState } from "react";
import ErrorModal from "../Modal/ErrorModal";
import { useHttpClient } from "../hooks/http-hook";
import UsersList from "./UserList";
import LoadingSpinner from "../UI-elements/LoadingSpinner";
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, isError, clearError, sendRequest } = useHttpClient();
  useEffect(() => {
    const getRequest = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setLoadedUsers(responseData.users);
      } catch (err) {}
    };

    getRequest();
  }, [sendRequest]);

  const errorHandler = () => {
    clearError();
  };
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;

import React, { createContext } from "react";
import PropTypes from "prop-types";
import useUser from "./useUser";

export const UserContext = createContext();

const UserProvider = props => {
  UserProvider.propTypes = {
    children: PropTypes.node.isRequired
  };
  const { children } = props;

  const user = useUser();

  return (
    <UserContext.Provider
      value={{
        user: {
          userState: user.userState,
          handleOnBlur: user.handleOnBlur,
          handleOnDateChange: user.handleOnDateChange,
          handleOnColorChange: user.handleOnColorChange,
          handleOnNameChange: user.handleOnNameChange,
          updateEditMode: user.updateEditMode,
          undoChanges: user.undoChanges
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserProvider;

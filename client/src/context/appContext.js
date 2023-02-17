import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import {
  DISPLAY_SPINNER,
  CLEAR_SPINNER,
  TOGGLE_SIDEBAR,
  GET_USER,
  UPDATE_USER,
} from "./actions";
import axios from "axios";
import { Navigate } from "react-router-dom";

const initialState = {
  isLoading: false,
  showSideBar: false,
  user: null,
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displaySpinner = () => {
    dispatch({
      type: DISPLAY_SPINNER,
    });
  };

  const clearSpinner = () => {
    dispatch({
      type: CLEAR_SPINNER,
    });
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const getUser = async () => {
    try {
      const res = await axios.post(
        "/api/v1/auth/getUserData",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const { data } = res.data;
      if (res.data.success) {
        dispatch({ type: GET_USER, payload: { data } });
      } else {
        <Navigate to="/login" />;
        localStorage.clear();
      }
    } catch (error) {
      localStorage.clear();
      console.log(error);
    }
  };

  const updateUser =  (newUser) => {
    try {
      dispatch({
        type: UPDATE_USER,
        payload: { newUser },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displaySpinner,
        clearSpinner,
        toggleSidebar,
        getUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useAppContext, initialState };

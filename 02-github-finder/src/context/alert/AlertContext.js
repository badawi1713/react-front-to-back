import { SET_ALERT } from "context/constants";
import { useReducer, createContext } from "react";
import alertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = {
    alert: {
      message: null,
      type: null,
    },
  };
  const [state, dispatch] = useReducer(alertReducer, initialState);

  const setAlert = (data) => {
    dispatch({
      type: SET_ALERT,
      payload: {
        alert: {
          message: data.message || "Alert message here ...",
          type: data.type || "error",
        },
      },
    });

    setTimeout(
      () =>
        dispatch({
          type: SET_ALERT,
          payload: {
            alert: {
              message: null,
              type: null,
            },
          },
        }),
      3000
    );
  };

  const changeAlert = (data) => {
    dispatch({
      type: SET_ALERT,
      payload: data,
    });
  };

  return (
    <AlertContext.Provider value={{ ...state, changeAlert, setAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;

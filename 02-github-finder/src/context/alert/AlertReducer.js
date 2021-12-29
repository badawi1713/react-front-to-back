import { SET_ALERT } from "context/constants";

const alertReducer = (state, action) => {
  switch (action.type) {
    case SET_ALERT:
      return Object.assign({}, state, action.payload);

    default:
      return state;
  }
};

export default alertReducer;

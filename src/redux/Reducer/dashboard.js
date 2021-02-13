import * as ActionTypes from "../Types/ActionTypes";

export const Dashboard = (
  state = { isLoading: true, errMess: null, dashboard: [], dailysale: [], itemwise: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_DASH:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dashboard: action.payload
      };

    case ActionTypes.FETCH_ITEMWISE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        itemwise: action.payload
      };

    case ActionTypes.FETCH_DAILYSALE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dailysale: action.payload
      };

    case ActionTypes.DASH_LOADING:
      return { ...state, isLoading: true, errMess: null, dashboard: [] };

    case ActionTypes.DASH_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        dashboard: []
      };

    default:
      return state;
  }
};

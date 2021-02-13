import * as ActionTypes from "../Types/ActionTypes";

export const Billing = (
  state = { isLoading: true, errMess: null, billing: [], billingid: [], report: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_BILLING:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billing: action.payload
      };

    case ActionTypes.FETCH_BILLINGREPORT:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        report: action.payload
      };

    case ActionTypes.FETCH_BILLINGID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        billingid: action.payload
      };

    case ActionTypes.BILLING_LOADING:
      return { ...state, isLoading: true, errMess: null, billing: [] };

    case ActionTypes.BILLING_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        billing: []
      };

    default:
      return state;
  }
};

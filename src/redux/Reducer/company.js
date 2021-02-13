import * as ActionTypes from "../Types/ActionTypes";

export const Company = (
  state = { isLoading: true, errMess: null, company: [], companyid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_COMPANY:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        company: action.payload
      };

    case ActionTypes.FETCH_COMPANYID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        companyid: action.payload
      };

    case ActionTypes.COMPANY_LOADING:
      return { ...state, isLoading: true, errMess: null, company: [] };

    case ActionTypes.COMPANY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        company: []
      };

    default:
      return state;
  }
};

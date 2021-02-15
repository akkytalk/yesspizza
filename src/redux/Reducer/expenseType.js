import * as ActionTypes from "../Types/ActionTypes";

export const ExpenseType = (
  state = { isLoading: true, errMess: null, expenseType: [], expenseTypeid: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.FETCH_EXPENSE_TYPE:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenseType: action.payload
      };

    case ActionTypes.FETCH_EXPENSE_TYPEID:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenseTypeid: action.payload
      };

    case ActionTypes.EXPENSE_TYPE_LOADING:
      return { ...state, isLoading: true, errMess: null, expenseType: [] };

    case ActionTypes.EXPENSE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        expenseType: []
      };

    default:
      return state;
  }
};

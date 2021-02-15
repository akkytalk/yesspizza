import * as ActionTypes from "../Types/ActionTypes";

export const AddExpenseType = (
  state = { isLoading: true, errMess: null, expenseType: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_EXPENSE_TYPE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expenseType: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_EXPENSE_TYPE:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        expenseType: []
      };

    case ActionTypes.DELETE_EXPENSE_TYPE:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        expenseType: [],
        edit: []
      };

    case ActionTypes.EXPENSE_TYPE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        expenseType: [],
        delete: []
      };

    case ActionTypes.EXPENSE_TYPE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        expenseType: [],
        delete: []
      };

    default:
      return state;
  }
};

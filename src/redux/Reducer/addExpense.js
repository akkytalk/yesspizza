import * as ActionTypes from "../Types/ActionTypes";

export const AddExpense = (
  state = { isLoading: true, errMess: null, expense: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_EXPENSE:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        expense: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_EXPENSE:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        expense: []
      };

    case ActionTypes.DELETE_EXPENSE:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        expense: [],
        edit: []
      };

    case ActionTypes.EXPENSE_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        expense: [],
        delete: []
      };

    case ActionTypes.EXPENSE_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        expense: [],
        delete: []
      };

    default:
      return state;
  }
};

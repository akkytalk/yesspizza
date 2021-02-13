import * as ActionTypes from "../Types/ActionTypes";

export const AddCompany = (
  state = { isLoading: true, errMess: null, company: [], edit: [], delete: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.POST_COMPANY:
      let data = [];
      data.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        company: data,
        edit: [],
        delete: []
      };

    case ActionTypes.EDIT_COMPANY:
      let editData = [];
      editData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: [],
        edit: editData,
        delete: [],
        company: []
      };

    case ActionTypes.DELETE_COMPANY:
      let deleteData = [];
      deleteData.push(action.payload);
      return {
        ...state,
        isLoading: false,
        errMess: null,
        delete: deleteData,
        company: [],
        edit: []
      };

    case ActionTypes.COMPANY_LOADING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        company: [],
        delete: []
      };

    case ActionTypes.COMPANY_FAILED:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
        company: [],
        delete: []
      };

    default:
      return state;
  }
};

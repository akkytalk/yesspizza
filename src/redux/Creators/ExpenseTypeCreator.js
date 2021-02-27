import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getExpenseTypePage = data => dispatch => {
  dispatch(expenseTypeLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "expenseTypes?page=" + data.pageno + "&pageSize=" + data.pageSize, {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        console.log("respose", response)
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => {
      response.json();
      // console.log("before", response.json());
    })
    .then(expenseType => {
      console.log("expenseType.Expense", expenseType.ExpenseType)
      dispatch(fetchExpenseType(expenseType.ExpenseType));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const getExpenseType = data => dispatch => {
  dispatch(expenseTypeLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getexpenseType", {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(expenseTypeid => {
      dispatch(fetchExpenseTypeID(expenseTypeid.ExpenseType));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const postExpenseType = data => dispatch => {
  dispatch(expenseTypeLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "expenseType", {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(expenseType => {
      dispatch(addExpenseType(expenseType.ExpenseType));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const removeExpenseType = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "expenseType/" + data.id, {
    method: "delete",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(expenseType => {
      dispatch(deleteExpenseType(data));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const editExpenseType = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "expenseType/" + data.id, {
    method: "post",
    headers: myheader,
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(expenseType => {
      dispatch(updateExpenseType(expenseType.ExpenseType));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const showExpenseType = data => dispatch => {
  dispatch(expenseTypeLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "expenseType/" + data.id + "?page=" + data.pageno, {
    method: "get",
    headers: myheader
  })
    .then(response => {
      if (response.ok) {
        return response;
      }
      let error = new Error(
        "Error:" + response.status + "Error Text: " + response.statusText
      );

      error.response = response;
      throw error;
    })
    .then(response => response.json())
    .then(res => {
      dispatch(fetchExpenseType(res.ExpenseType));
    })
    .catch(error => dispatch(expenseTypeFailed(error)));
};

export const expenseTypeLoading = () => ({
  type: ActionTypes.CATEGORY_LOADING
});

export const expenseTypeFailed = errmess => ({
  type: ActionTypes.CATEGORY_FAILED,
  payload: errmess
});

export const addExpenseType = expenseType => ({
  type: ActionTypes.POST_CATEGORY,
  payload: expenseType
});

export const updateExpenseType = expenseType => ({
  type: ActionTypes.EDIT_CATEGORY,
  payload: expenseType
});

export const deleteExpenseType = expenseType => ({
  type: ActionTypes.DELETE_CATEGORY,
  payload: expenseType
});

export const fetchExpenseType = expenseType => ({
  type: ActionTypes.FETCH_CATEGORY,
  payload: expenseType
});

export const fetchExpenseTypeID = expenseTypeid => ({
  type: ActionTypes.FETCH_CATEGORYID,
  payload: expenseTypeid
});

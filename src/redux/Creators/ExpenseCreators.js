// import * as ActionTypes from "../Types/ActionTypes";
// import { baseUrl } from "../../shared/baseUrl";

// export const getExpensePage = data => dispatch => {
//   dispatch(expenseLoading(true));
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "Expense?page=" + data.pageno + "&pageSize=" + data.pageSize, {
//     method: "get",
//     headers: myheader
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(expense => {
//       dispatch(fetchExpense(expense.Expense));
//     })
//     .catch(error => dispatch(productFailed(error)));
// };

// export const getExpense = data => dispatch => {
//   dispatch(expenseLoading(true));
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "getproduct", {
//     method: "get",
//     headers: myheader
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(expenseid => {
//       dispatch(fetchExpenseID(expenseid.Expense));
//     })
//     .catch(error => dispatch(productFailed(error)));
// };

// export const postExpense = data => dispatch => {
//   dispatch(productLoading(true));
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "expense", {
//     method: "post",
//     headers: myheader,
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(expense => {
//       dispatch(addExpense(expense.Expense));
//     })
//     .catch(error => dispatch(expenseFailed(error)));
// };

// export const removeExpense = data => dispatch => {
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "expense/" + data.id, {
//     method: "delete",
//     headers: myheader
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(expense => {
//       dispatch(deleteExpense(data));
//     })
//     .catch(error => dispatch(expenseFailed(error)));
// };

// export const editExpense = data => dispatch => {
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "expense/" + data.id, {
//     method: "post",
//     headers: myheader,
//     body: JSON.stringify(data)
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(expense => {
//       dispatch(updateProduct(expense.Expense));
//     })
//     .catch(error => dispatch(expenseFailed(error)));
// };

// export const showExpense = data => dispatch => {
//   dispatch(expenseLoading(true));
//   const myheader = new Headers({
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: "Bearer " + data.token
//   });

//   return fetch(baseUrl + "expense/" + data.id + "?page=" + data.pageno, {
//     method: "get",
//     headers: myheader
//   })
//     .then(response => {
//       if (response.ok) {
//         return response;
//       }
//       let error = new Error(
//         "Error:" + response.status + "Error Text: " + response.statusText
//       );

//       error.response = response;
//       throw error;
//     })
//     .then(response => response.json())
//     .then(res => {
//       dispatch(fetchExpense(res.Expense));
//     })
//     .catch(error => dispatch(expenseFailed(error)));
// };

// export const expenseLoading = () => ({
//   type: ActionTypes.EXPENSE_LOADING
// });

// export const expenseFailed = errmess => ({
//   type: ActionTypes.EXPENSE_FAILED,
//   payload: errmess
// });

// export const addExpense = expense => ({
//   type: ActionTypes.POST_EXPENSE,
//   payload: expense
// });

// export const updateExpense = expense => ({
//   type: ActionTypes.EDIT_EXPENSE,
//   payload: expense
// });

// export const deleteExpense = expense => ({
//   type: ActionTypes.DELETE_EXPENSE,
//   payload: expense
// });

// export const fetchExpense = expense => ({
//   type: ActionTypes.FETCH_EXPENSE,
//   payload: expense
// });

// export const fetchExpenseID = expenseid => ({
//   type: ActionTypes.FETCH_EXPENSEID,
//   payload: expenseid
// });

// import * as ActionTypes from "../Types/ActionTypes";

// export const Expense = (
//   state = { isLoading: true, errMess: null, expense: [], expenseid: [] },
//   action
// ) => {
//   switch (action.type) {
//     case ActionTypes.FETCH_EXPENSE:
//       return {
//         ...state,
//         isLoading: false,
//         errMess: null,
//         expense: action.payload
//       };

//     case ActionTypes.FETCH_EXPENSEID:
//       return {
//         ...state,
//         isLoading: false,
//         errMess: null,
//         expenseid: action.payload
//       };

//     case ActionTypes.EXPENSE_LOADING:
//       return { ...state, isLoading: true, errMess: null, expense: [] };

//     case ActionTypes.EXPENSE_FAILED:
//       return {
//         ...state,
//         isLoading: false,
//         errMess: action.payload,
//         product: []
//       };

//     default:
//       return state;
//   }
// };

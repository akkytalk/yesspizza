import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getCount = data => dispatch => {
  dispatch(dashboardLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "countcard", {
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
    .then(dashboard => {
      dispatch(fetchDashboard(dashboard.Stock));
    })
    .catch(error => dispatch(dashboardFailed(error)));
};

export const getItemwise = data => dispatch => {
  dispatch(dashboardLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "itemwise", {
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
    .then(dashboard => {
      dispatch(fetchItemwise(dashboard.Stock));
    })
    .catch(error => dispatch(dashboardFailed(error)));
};

export const getDaily = data => dispatch => {
  dispatch(dashboardLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "dailysale", {
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
    .then(dashboard => {
      dispatch(fetchDailysale(dashboard.Stock));
    })
    .catch(error => dispatch(dashboardFailed(error)));
};

export const dashboardLoading = () => ({
  type: ActionTypes.DASH_LOADING
});

export const dashboardFailed = errmess => ({
  type: ActionTypes.DASH_FAILED,
  payload: errmess
});

export const deleteDashboard = dashboard => ({
  type: ActionTypes.DELETE_DASH,
  payload: dashboard
});

export const fetchDashboard = dashboard => ({
  type: ActionTypes.FETCH_DASH,
  payload: dashboard
});

export const fetchItemwise = dashboard => ({
  type: ActionTypes.FETCH_ITEMWISE,
  payload: dashboard
});

export const fetchDailysale = dailysale => ({
  type: ActionTypes.FETCH_DAILYSALE,
  payload: dailysale
});

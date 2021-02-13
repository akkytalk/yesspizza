import * as ActionTypes from "../Types/ActionTypes";
import { baseUrl } from "../../shared/baseUrl";

export const getCompanyPage = data => dispatch => {
  dispatch(companyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "companies?page=" + data.pageno + "&pageSize=" + data.pageSize, {
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
    .then(company => {
      dispatch(fetchCompany(company.Company));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const getCompany = data => dispatch => {
  dispatch(companyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "getcompany", {
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
    .then(companyid => {
      dispatch(fetchCompanyID(companyid.Company));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const postCompany = data => dispatch => {
  dispatch(companyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "company", {
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
    .then(company => {
      dispatch(addCompany(company.Company));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const removeCompany = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "company/" + data.id, {
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
    .then(company => {
      dispatch(deleteCompany(data));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const editCompany = data => dispatch => {
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "company/" + data.id, {
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
    .then(company => {
      dispatch(updateCompany(company.Company));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const showCompany = data => dispatch => {
  dispatch(companyLoading(true));
  const myheader = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + data.token
  });

  return fetch(baseUrl + "company/" + data.id + "?page=" + data.pageno, {
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
      dispatch(fetchCompany(res.Company));
    })
    .catch(error => dispatch(companyFailed(error)));
};

export const companyLoading = () => ({
  type: ActionTypes.COMPANY_LOADING
});

export const companyFailed = errmess => ({
  type: ActionTypes.COMPANY_FAILED,
  payload: errmess
});

export const addCompany = company => ({
  type: ActionTypes.POST_COMPANY,
  payload: company
});

export const updateCompany = company => ({
  type: ActionTypes.EDIT_COMPANY,
  payload: company
});

export const deleteCompany = company => ({
  type: ActionTypes.DELETE_COMPANY,
  payload: company
});

export const fetchCompany = company => ({
  type: ActionTypes.FETCH_COMPANY,
  payload: company
});

export const fetchCompanyID = companyid => ({
  type: ActionTypes.FETCH_COMPANYID,
  payload: companyid
});

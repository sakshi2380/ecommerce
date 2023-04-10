import { API,Local_API } from "../../backend";
import { toast } from "react-toastify";

export const signup = user => {
  return fetch(`${API}/signup`, {
    method: "POST",
    headers: { 
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      console.log(JSON.stringify("1: "+user));
      return response.json();
    })
    .catch(err => console.log(err));
    //console.log(JSON.stringify("2: "+user));
};

export const signin = user => {
  return fetch(`${API}/login`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

export const signout = next => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("jwt");
    next();

    return fetch(`${API}/signout`, {
      method: "GET"
    })
      .then(response => console.log("signout success"))
      .catch(err => console.log(err));
  }
};

export const isAutheticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
export const postWithoutToken = (url, values) => {
  return fetch(API + url , {
    method: "POST",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    // .catch((error) => toast.error(error?.response));
};
export const setLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};
export const getLocalStorage = (key) => {
  return localStorage.getItem(key);
};
export const clearLocalStorage = () => {
  return localStorage.clear();
};
export const updateProfile = (userId,token,user) => {
  console.log(user,'user');
  return fetch(`${API}/profileupdate/${userId}`, {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MjI4YTRkZmVmYWJlYWQ5ZmYwZDkzMCIsImlhdCI6MTY4MTEyOTcxNCwiZXhwIjoxNjgxNTYxNzE0fQ.XldVF_BlpAa-zWVoikLvoJ42xUMCstIez-7F48CFl1I"
    },
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
export const putWithoutToken = (url, values) => {
  return fetch(`${Local_API} + url`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .catch((error) => toast.error(error?.response));
};
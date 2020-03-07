const axios =require("axios");
const BASE_HEADERS = "";
const validStatuses = [200, 201, 400];
class ApiHelper {
  constructor() {}

  post(uri, data) {
    return axios
      .post(uri, data, {
        headers: this.getHeaders(),
        withCredentials: false
      })
      .then(this.checkResponse)
      .catch(this.handleError);
  }
  get(uri) {
    return axios
      .get(uri, {
        headers: this.getHeaders(),
        withCredentials: false
      })
      .then(this.checkResponse)
      .catch(this.handleError);
  }
  getHeaders(multipart = false) {
    let defaultHeaders = BASE_HEADERS;
    if (multipart) {
      defaultHeaders = {};
    }
    /* if (sessionStorage.getItem("Token")) {
      defaultHeaders = {
        Authorization: "Bearer " + sessionStorage.getItem("Token"),
        ...defaultHeaders
      };
    } */
    console.log(defaultHeaders);
    return defaultHeaders;
  }
  /*
   * Wraps error responses from the API
   * and returns `Promise.reject` with error
   */
  checkResponse(response) {
    if (validStatuses.includes(response.status)) {
      return response.data;
    }
    // If not authorized then reset authorization
    // and redirect to login page

    /* if (response.status === 401) {
      sessionStorage.clear();
      return Promise.reject(new Error("USER_ANONYMOUS"));
    } else {
      let err = new Error(response.statusText);
      err.response = response;
      return Promise.reject(err);
    } */
  }

  handleError(error) {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        /* case 401:
          sessionStorage.clear();
          return Promise.reject(error.response.data); */
        // return error.response.data
        case 400:
          return Promise.reject(error.response.data);
        // return error.response.data
        case 404:
          return Promise.reject(error.response.data);
        // return error.response.data
        default:
          let err = new Error(error.response.data);
          return Promise.reject(err);
      }
    } else {
      let err = new Error(error.response);
      return Promise.reject(err);
    }
  }
};


module.exports=ApiHelper;
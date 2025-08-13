// const axios = require("axios").default;
const axios = require("axios");

const DEFAULT_REQUEST_HEADERS = {
  "Content-Type": "application/json",
  Accept: "*/*",
};

module.exports = class HttpService {
  #baseUrl;
  #defaultHeaders;
  constructor(baseUrl, apiRoot, customHeaders = null) {
    this.#baseUrl = baseUrl + apiRoot;
    this.#defaultHeaders = customHeaders
      ? customHeaders
      : DEFAULT_REQUEST_HEADERS;
  }

  async sendGetRequest(relativeAddress, headers = null) {
    const requestUrl = `${this.#baseUrl}${relativeAddress}`;
    const requestHeaders = headers || this.#defaultHeaders;
    return await axios.get(requestUrl, {
      headers: {
        ...requestHeaders,
      },
    });
  }

  async sendPostRequest(relativeAddress, body, headers = null) {
    const requestUrl = `${this.#baseUrl}${relativeAddress}`;
    const requestHeaders = headers || this.#defaultHeaders;
    return await axios.post(requestUrl, body, {
      headers: {
        ...requestHeaders,
      },
    });
  }

  async sendPatchRequest(relativeAddress, body, headers = null) {
    const requestUrl = `${this.#baseUrl}${relativeAddress}`;
    const requestHeaders = headers || this.#defaultHeaders;
    return await axios.patch(requestUrl, body, {
        headers: {
            ...requestHeaders
        },
    })
  }

  async sendDeleteRequest(relativeAddress, headers = null) {
    const requestUrl = `${this.#baseUrl}${relativeAddress}`;
    const requestHeaders = headers || this.#defaultHeaders;
    return await axios.delete(requestUrl, {
      headers: {
        ...requestHeaders,
      },
    });
  }
}

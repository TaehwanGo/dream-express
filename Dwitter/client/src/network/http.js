import axios from "axios";

export default class HttpClient {
  constructor(baseURL, authErrorEventBus) {
    this.authErrorEventBus = authErrorEventBus;
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  async fetch(url, options) {
    const { body, method, headers } = options;
    const request = {
      url,
      method,
      headers: {
        ...headers,
        // 'dwitter-csrf-token': this.getCsrfToken(), // TODO : 26장을 듣고 보완하기
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (error) {
      // status가 400번대 이거나 500번대인 경우
      if (error.response) {
        const data = error.response.data;
        const message =
          data && data.message ? data.message : "Something went wrong";
        throw new Error(message);
      }
      throw new Error("connection error");
    }
  }
}

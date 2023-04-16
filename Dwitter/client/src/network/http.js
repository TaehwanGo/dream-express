import axios from "axios";
import axiosRetry from "axios-retry";

const defaultRetryConfig = {
  retries: 5,
  initialDelayMs: 100,
};
export default class HttpClient {
  constructor(baseURL, authErrorEventBus, config = defaultRetryConfig) {
    this.authErrorEventBus = authErrorEventBus;
    this.client = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    /**
     * axios instance를 첫 번째 인자로 전달해야 함
     */
    axiosRetry(this.client, {
      retries: config.retries, // 보통은 3번
      retryDelay: (retryCount) => {
        const delay = Math.pow(2, retryCount) * config.initialDelayMs; // 100ms, 200ms, 400ms, 800ms, 1600ms
        const jitter = delay * 0.1 * Math.random(); // delay의 10% 범위 내에서 랜덤으로 더해줌
        return delay + jitter;
      },
      retryCondition: (error) => {
        return (
          axiosRetry.isNetworkOrIdempotentRequestError(error) ||
          error.response.status === 429
        );
      },
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
      const res = await this.client(request);
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

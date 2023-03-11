import socket from "socket.io-client";

export default class Socket {
  constructor(baseURL, getAccessToken) {
    this.io = socket(baseURL, {
      auth: (cb) => cb({ token: getAccessToken() }),
    });

    this.io.on("connect_error", (error) => {
      console.log(error);
    });
  }

  onSync(event, callback) {
    if (!this.io.connected) {
      this.io.connect(); // 소켓을 수동으로 연결합니다. : https://socket.io/docs/v4/client-api/#socketconnect
    }

    /**
     * 주어진 이벤트에 대한 새 핸들러를 등록합니다.
     * - TweetService에서 사용
     * https://socket.io/docs/v4/client-api/#socketoneventname-callback
     */
    this.io.on(event, (message) => callback(message));
    return () => this.io.off(event);
  }

  emit(event, message) {
    this.io.emit(event, message);
  }
}

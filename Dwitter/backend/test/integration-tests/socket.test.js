import axios from "axios";
import { startServer, stopServer } from "../../app.js";
import { faker } from "@faker-js/faker";
import { io as SocketClient } from "socket.io-client";
import { createNewUserAccount } from "./auth_utils.js";

describe("Sockets", () => {
  let server;
  let request;
  let clientSocket;

  beforeAll(async () => {
    server = await startServer();
    request = axios.create({
      baseURL: `http://localhost:${server.address().port}`,
      validateStatus: null,
    });
  });

  afterAll(async () => {
    await stopServer(server);
  });

  beforeEach(() => {
    clientSocket = new SocketClient(
      `http://localhost:${server.address().port}`
    );
  });

  afterEach(() => {
    clientSocket.disconnect();
  });

  it("does not accept a connetion without authorization token", (done) => {
    clientSocket.on("connect_error", () => {
      done();
    });

    clientSocket.on("connect", () => {
      done(new Error("Accepted a connection while expected not to"));
    });

    clientSocket.connect();
  });

  it("accepts a connection with authorization token", async () => {
    const user = await createNewUserAccount(request);
    clientSocket.auth = (cb) => cb({ token: user.jwt });

    const socketPromise = new Promise((resolve, reject) => {
      clientSocket.on("connect", () => {
        resolve("success");
      });

      clientSocket.on("connect_error", () => {
        reject(
          new Error("Server was expected to accept the connection but did not")
        );
      });
    });

    clientSocket.connect();
    // Promise와 await을 이용한 비동기 테스트 == done()을 이용한 비동기 테스트
    await expect(socketPromise).resolves.toEqual("success");
  });

  it('emits "tweets" event when new tweet is posted', async () => {
    const user = await createNewUserAccount(request);
    clientSocket.auth = (cb) => cb({ token: user.jwt });
    const text = faker.lorem.words(3);

    clientSocket.on("connect", async () => {
      await request.post(
        "/tweets",
        { text },
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
    });

    const socketPromise = new Promise((resolve, reject) => {
      clientSocket.on("tweets", (tweet) => resolve(tweet));
    });

    clientSocket.connect();

    await expect(socketPromise).resolves.toMatchObject({
      text,
      username: user.username,
      name: user.name,
    });
  });
});

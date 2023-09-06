import axios from "axios";
import { startServer, stopServer } from "../../app.js";
import { sequelize } from "../../db/database.js";
import { faker } from "@faker-js/faker";

describe("Auth APIs", () => {
  let server;
  let request;

  /**
   * beforeAll, afterAll 인 이유
   * - 성능적으로 데이터베이스를 올렸다 내렸다 하는 것은 느리기 때문에 사용
   * - 대신에 테스트를 작성해서 주의해서 작성해야 함
   */
  beforeAll(async () => {
    server = await startServer();
    request = axios.create({
      baseURL: "http://localhost:4000",
      validateStatus: null, // 200대는 전부 성공, 나머진 Error, 그런데 테스트 할 때는 우리가 예상하는 것이기 때문에 전부 처리되도록 설정
    });
  });

  // 테스트가 끝난 다음
  afterAll(async () => {
    await sequelize.drop(); // sequelize에 있는 모든 테이블을 삭제
    await stopServer(server);
  });

  describe("POST to /auth/signup", () => {
    it("returns 201 and authorization token when user details are valid", async () => {
      const fakeUser = makeValidUserDetails();

      const response = await request.post("/auth/signup", fakeUser);

      expect(response.status).toBe(201);
      expect(response.data.token.length).toBeGreaterThan(0);
    });

    it("returns 409 when username has already been taken", async () => {
      const fakeUser = makeValidUserDetails();
      const response = await request.post("/auth/signup", fakeUser);
      expect(response.status).toBe(201);
      const response2 = await request.post("/auth/signup", fakeUser);

      expect(response2.status).toBe(409);
      expect(response2.data.message).toBe(
        `${fakeUser.username} already exists`
      );
    });

    it("returns 400 when username is less than 5 characters", async () => {
      const fakeUser = makeValidUserDetails();
      fakeUser.username = "abc";

      const response = await request.post("/auth/signup", fakeUser);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe(
        "username should be at least 5 characters"
      );
    });

    it("returns 400 when password is less than 5 characters", async () => {
      const fakeUser = makeValidUserDetails();
      fakeUser.password = "abc";

      const response = await request.post("/auth/signup", fakeUser);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe(
        "password should be at least 5 characters"
      );
    });

    it("returns 400 when name is missing", async () => {
      const fakeUser = makeValidUserDetails();
      fakeUser.name = "";

      const response = await request.post("/auth/signup", fakeUser);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe("name is missing");
    });

    it("returns 400 when email is invalid", async () => {
      const fakeUser = makeValidUserDetails();
      fakeUser.email = "abc";

      const response = await request.post("/auth/signup", fakeUser);

      expect(response.status).toBe(400);
      expect(response.data.message).toBe("invalid email");
    });

    // test.each([
    //   {a: 1, b: 1, expected: 2},
    //   {a: 1, b: 2, expected: 3},
    //   {a: 2, b: 1, expected: 3},
    // ])('.add($a, $b)', ({a, b, expected}) => {
    //   expect(a + b).toBe(expected);
    // });

    test.each([
      { missingFieldName: "name", expectedMessage: "name is missing" },
      // {
      //   missingFieldName: "username",
      //   expectedMessage: "username should be at least 5 characters",
      // },
      {
        missingFieldName: "password",
        expectedMessage: "password should be at least 5 characters",
      },
      { missingFieldName: "email", expectedMessage: "invalid email" },
    ])(
      `return 400 when $missingFieldName field is missing`,
      async ({ missingFieldName, expectedMessage }) => {
        const fakeUser = makeValidUserDetails();
        delete fakeUser[missingFieldName];

        const response = await request.post("/auth/signup", fakeUser);

        expect(response.status).toBe(400);
        expect(response.data.message).toBe(expectedMessage);
      }
    );
  });
});

function makeValidUserDetails() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
  };
}

import httpMocks from "node-mocks-http";
import { isAuth } from "../auth.js";
import { faker } from "@faker-js/faker";
import jwt from "jsonwebtoken";
import * as userRepository from "../../data/auth.js"; // 테스트에선 외부 라이브러리에 의존하는 대신 mock을 사용

jest.mock("jsonwebtoken");
jest.mock("../../data/auth.js");

describe("Auth Middleware", () => {
  it("return 401 for the request without Authorization header", async () => {
    // given
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData()).toEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  it("return 401 for the request with unsupported Authorization header", async () => {
    // given
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: "Basic",
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData()).toEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  // 토큰이 맞지 않는 경우
  it("return 401 for the request with invalid JWT", async () => {
    // given
    const token = faker.random.alphaNumeric(128);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    // verify 함수를 mocking
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(new Error("bad token"), undefined);
    });

    // when
    await isAuth(request, response, next);

    // then
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData()).toEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });

  // 토큰은 맞지만 유저가 없는 경우
  it("return 401 when cannot find a user by id from JWT", async () => {
    // given
    const token = faker.random.alphaNumeric(128);
    const userId = faker.random.alphaNumeric(32);
    const request = httpMocks.createRequest({
      method: "GET",
      url: "/tweets",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response = httpMocks.createResponse();
    const next = jest.fn();
    jwt.verify = jest.fn((token, secret, callback) => {
      callback(undefined, { id: userId });
    });
    userRepository.findById = jest.fn((id) => Promise.resolve(undefined));

    // when
    await isAuth(request, response, next);

    // then
    // 아래와 같이 중복적으로 사용되는 코드는 함수로 빼서 작성해도 된다
    expect(response.statusCode).toBe(401);
    expect(response._getJSONData()).toEqual({
      message: "Authentication Error",
    });
    expect(next).not.toBeCalled();
  });
});

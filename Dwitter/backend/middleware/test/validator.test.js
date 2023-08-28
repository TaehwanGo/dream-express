import httpMocks from "node-mocks-http";
import { faker } from "@faker-js/faker";
import { validate } from "../validator.js";
import * as validator from "express-validator";

jest.mock("express-validator");

describe("Validator Middleware", () => {
  // 성공한 경우
  it("call next if there are no validation errors", async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();

    validator.validationResult = jest.fn(() => ({ isEmpty: () => true }));

    validate(request, response, next);

    expect(next).toBeCalled();
  });

  // 실패한 경우
  it("returns 400 if there are validation errors", async () => {
    const request = httpMocks.createRequest();
    const response = httpMocks.createResponse();
    const next = jest.fn();
    const errorMsg = faker.lorem.sentence();
    validator.validationResult = jest.fn(() => ({
      isEmpty: () => false,
      array: () => [{ msg: errorMsg }],
    }));

    validate(request, response, next);

    expect(next).not.toBeCalled();
    expect(response.statusCode).toBe(400);
    expect(response._getJSONData().message).toBe(errorMsg);
  });
});

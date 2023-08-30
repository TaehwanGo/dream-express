import { faker } from "@faker-js/faker";
import { TweetController } from "../tweet";
import httpMocks from "node-mocks-http";

describe("Tweet Controller", () => {
  let tweetController;
  let tweetRepository;
  let mockedSocket;
  beforeEach(() => {
    tweetRepository = {};
    mockedSocket = {
      emit: jest.fn(),
    };
    tweetController = new TweetController(tweetRepository, () => mockedSocket);
  });

  describe("getTweets", () => {
    it("returns all tweets when username is not provided", async () => {
      const request = httpMocks.createRequest();
      const response = httpMocks.createResponse();
      const allTweets = [
        { text: faker.lorem.words(3) },
        { text: faker.lorem.words(3) },
      ];
      tweetRepository.getAll = () => allTweets;

      await tweetController.getTweets(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(allTweets);
    });

    it("returns tweets for the given user when username is provided", async () => {
      const username = faker.person.fullName();
      const request = httpMocks.createRequest({
        query: { username },
      });
      const response = httpMocks.createResponse();
      const userTweets = [{ text: faker.lorem.words(3) }];
      tweetRepository.getAllByUsername = jest.fn(() => userTweets);

      await tweetController.getTweets(request, response);

      expect(response.statusCode).toBe(200);
      expect(response._getJSONData()).toEqual(userTweets);
      expect(tweetRepository.getAllByUsername).toHaveBeenCalledWith(username);
      expect(tweetRepository.getAllByUsername).toHaveBeenCalledTimes(1);
    });
  });
});

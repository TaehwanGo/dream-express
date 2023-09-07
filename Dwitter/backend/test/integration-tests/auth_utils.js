import { faker } from "@faker-js/faker";

export async function createNewUserAccount(request) {
  const userDetails = makeValidUserDetails();
  const prepareUserResponse = await request.post("/auth/signup", userDetails);
  return {
    ...userDetails,
    jwt: prepareUserResponse.data.token,
  };
}

export function makeValidUserDetails() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
  };
}

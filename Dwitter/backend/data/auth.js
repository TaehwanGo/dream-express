// abcd1234: $2b$10$2b6MTktCAbKk5tSb.L/zBeYYBUQx3N1ZzjhVRnflR9pj4GiLS4trG
let users = [
  {
    id: "1",
    username: "tony",
    password: "$2b$10$2b6MTktCAbKk5tSb.L/zBeYYBUQx3N1ZzjhVRnflR9pj4GiLS4trG", // abcd1234
    name: "tony",
    email: "gth1123@naver.com",
    url: "https://mblogthumb-phinf.pstatic.net/20160817_259/retspe_14714118890125sC2j_PNG/%C7%C7%C4%AB%C3%F2_%281%29.png?type=w800",
  },
  {
    id: "2",
    username: "taehwan",
    password: "$2b$10$2b6MTktCAbKk5tSb.L/zBeYYBUQx3N1ZzjhVRnflR9pj4GiLS4trG",
    name: "taehwan",
    email: "gth1123@gmail.com",
    url: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FpWFlZ%2FbtqXgpiSsn1%2F5fikiWoiYmwlipGykLFQfk%2Fimg.jpg",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = {
    ...user,
    id: Date.now().toString(),
  };
  users.push(created);
  return created.id;
}

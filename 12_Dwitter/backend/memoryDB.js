export const posts = [
  {
    id: "1",
    title: "오늘은 노드 강의를 듣는 날이다",
    name: "Tony",
  },
  {
    id: "2",
    title: "내일은 운영체제 스터디가 있다",
    name: "Tony",
  },
  {
    id: "3",
    title: "강의를 완주하면 테스트코드 강의를 무료로 들을 수 있다",
    name: "Ellie",
  },
];

export const addPost = (title, name) => {
  const post = { id: Date.now().toString(), title, name };
  posts.push(post);
  return post;
};

export const getPosts = () => posts;

export const getPostById = (id) => posts.find((post) => post.id === id);

export const getPostByUserName = (name) =>
  posts.filter((post) => post.name === name);

export const deletePost = (id) => {
  const postIndex = posts.findIndex((post) => post.id === id);
  if (postIndex === -1) {
    return;
  }
  posts.splice(postIndex, 1);
};

export const updatePost = (id, title) => {
  const post = posts.find((post) => post.id === id);
  if (post) {
    post.title = title;
    return post;
  }
};

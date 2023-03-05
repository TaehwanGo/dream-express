const TOKEN = "token";

// 브라우저 storage에 저장하는 것은 안전하지 않습니다 -> 나중에 보너스 챕터에서 개선
export default class TokenStorage {
  saveToken(token) {
    localStorage.setItem(TOKEN, token);
  }

  getToken() {
    return localStorage.getItem(TOKEN);
  }

  clearToken() {
    localStorage.removeItem(TOKEN);
  }
}

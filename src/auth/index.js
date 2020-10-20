import jwt from "jsonwebtoken";

export default {
  getToken() {
    let token = localStorage.getItem("token");

    if (token) {
      return token;
    }
  },
  setToken(token) {
    localStorage.setItem("token", token);
  },
  destroyToken(token) {
    localStorage.removeItem(token);
  },
  is_Auth() {
    return this.getToken();
  }
};

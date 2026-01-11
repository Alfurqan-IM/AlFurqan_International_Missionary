export function getStoredUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function setStoredUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

// STUB: save login token to local storage
export function setLoginToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}
// STUB: remove login token to local storage
export function removeToken() {
  localStorage.removeItem("token");
  localStorage.clear();
}

// STUB: get login token from local storage
export function getLoginToken() {
  const token = localStorage.getItem("token");
  return token ? JSON.parse(token) : null;
}

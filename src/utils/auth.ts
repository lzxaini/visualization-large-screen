const TokenKey = 'USERINFO';

export function getUserInfo() {
  return JSON.parse(<string>window.localStorage.getItem(TokenKey))
}

export function setUserInfo(data: object) {
  window.localStorage.setItem(TokenKey, JSON.stringify(data))
}

export function removeToken() {
  return window.localStorage.removeItem(TokenKey)
}

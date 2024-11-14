// const api = fetch("http://localhost:8000", {
//   method: "GET",
//   headers: {
//     Accept: "application/json",
//     "Content-type": "application/json",
//   },
// }).then((response) => response.json());
import wretch from "wretch";
const api = wretch("http://localhost:8000").accept("application/json");

const storeToken = () => {
  Cookies.set(type + "Token", token);
};

const token = () => {
  return Cookies.get(type + "Token");
};

const removeTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
};

const getToken = (type) => {
  return Cookies.get(type + "Token");
};

const register = (email, username, password) => {
  return api.post({ email, username, password }, "/auth/users/");
};

const login = (username, email, password) => {
  return api.post({ username, email, password }, "/auth/jwt/create");
};

const logout = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/logout/");
};

const handleJWTRefresh = () => {
  const refreshToken = getToken("refresh");
  return api.post({ refresh: refreshToken }, "/auth/jwt/refresh");
};

const resetPassword = () => {
  return api.post({ email }, "/auth/users/reset_password/");
};

const resetPasswordConfirm = () => {
  return api.post(
    { uid, token, new_password, re_new_password },
    "/auth/users/reset_password_confirm/"
  );
};

export const AuthActions = () => {
  return {
    login,
    resetPasswordConfirm,
    handleJWTRefresh,
    register,
    resetPassword,
    storeToken,
    getToken,
    logout,
    removeTokens,
  };
};

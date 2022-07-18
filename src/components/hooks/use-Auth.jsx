import { useEffect, useCallback, useState } from "react";
let logoutTimer;
const useAuth = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [tokenExpireDate, setTokenExpireDate] = useState(); // for Auto Login and Logout

  const login = useCallback((uid, token, expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60 * 3); //expiration date of after 3 hours
    setTokenExpireDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        tokenExpireOn: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    setTokenExpireDate(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    if (token && tokenExpireDate) {
      const remainingTime = tokenExpireDate.getTime() - new Date().getTime(); //calculates the remaining time till token expires.
      logoutTimer = setTimeout(logout, remainingTime); //logsout if the token expires while using the app.
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpireDate]);

  useEffect(() => {
    //useEffect runs after the render cycle.
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.tokenExpireOn) > new Date()
    ) {
      login(
        storedData.userId,
        storedData.token,
        new Date(storedData.tokenExpireOn)
      );
    }
  }, [login]); //login uses useCallback so it will run just once.
  return { token, login, logout, userId };
};

export default useAuth;

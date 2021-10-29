import Loader from "../components/Loader";
import Auth from "../apis/auth";
import { storeUser, removeUser, getUser } from "../utils";
import Router from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async (data) => {
    try {
      setError("");

      await Auth.login(data);

      setUser(data.phone);
      storeUser(foundUser);
      Router.push("/bus/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message);
    }
  };

  const logout = () => {
    setUser(null);
    removeUser();
    Router.push("/bus/login");
  };

  useEffect(() => {
    const data = getUser();

    if (data) setUser(data);

    setLoading(false);
  }, []);

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      login,
      logout,
    }),
    [user, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

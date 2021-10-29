import Loader from "../components/Loader";
import Auth from "../apis/auth";
import { storeUser, removeUser, getUser, storeToken } from "../utils";
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

      const {
        data: { token },
      } = await Auth.login(data);

      storeToken(token);

      setUser(data.phone);
      storeUser(data.phone);
      Router.push("/bus/dashboard");
    } catch (err) {
      console.error(err);
      setError(err?.message || "Something went wrong");
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

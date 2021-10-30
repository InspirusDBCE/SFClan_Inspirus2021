import Loader from "../components/Loader";
import Auth from "../apis/auth";
import {
  storeUser,
  removeUser,
  getUser,
  storeToken,
  removeToken,
} from "../utils";
import Router from "next/router";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useToast } from "@chakra-ui/react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

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
      return true;
    } catch (err) {
      console.error(err?.response);

      if (err?.response?.status >= 500) {
        setError("Something went wrong");
        toast({
          title: "Something went wrong",
          description: "Please Try again",
          status: "warning",
        });
      } else {
        setError("Wrong Email/Password");
        toast({
          title: "Wrong email/password",
          description: "Please Try again",
          status: "warning",
        });
      }

      return false;
    }
  };

  const register = async (data) => {
    try {
      setError("");

      await Auth.register(data);
      removeToken();
      setUser("");
      storeUser("");
      Router.push("/bus/login");
      return true;
    } catch (err) {
      console.error(err);

      const status = err?.response?.status;
      let errorText = "";

      if (status >= 500) errorText = "Something went wrong";
      else if (status === 409)
        errorText = "A Bus Manager with that phone already exists";
      else errorText = "Wrong Phone/Password";

      setError(errorText);
      toast({
        title: errorText,
        description: "Please Try again",
        status: "warning",
      });

      return false;
    }
  };

  const logout = () => {
    setUser("");
    removeUser();
    removeToken();
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
      register,
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

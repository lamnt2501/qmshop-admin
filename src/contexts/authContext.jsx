import { createContext, useContext, useReducer } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
const AuthContext = createContext();

const initialState = {
  token: Cookies.get("accessToken") || "",
};

function reducer(state, action) {
  switch (action.type) {
    case "auth/setToken":
      return {
        ...state,
        token: action.payload,
      };
    case "auth/logout":
      return {
        ...state,
        token: "",
      };
    default:
      throw new Error("Invalid action in  auth context!");
  }
}

function setToken(token) {
  Cookies.set("accessToken", token, {
    expires: new Date(Date.now() + 60 * 1000 * 24 * 60),
  });
  return { type: "auth/setToken", payload: token };
}

function logout() {
  Cookies.remove("accessToken");
  return { type: "auth/logout" };
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider value={{ ...state, dispatch, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

function useAuthContext() {
  const data = useContext(AuthContext);
  if (!data) throw new Error("Out of auth context");
  return data;
}

export { useAuthContext, AuthProvider };

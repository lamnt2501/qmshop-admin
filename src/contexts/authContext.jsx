import { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
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
  Cookies.set("accessToken", token);
  return { type: "auth/setToken", payload: token };
}

function logout() {
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

function useAuthContext() {
  const data = useContext(AuthContext);
  if (!data) throw new Error("Out of auth context");
  return data;
}

export { useAuthContext, AuthProvider };

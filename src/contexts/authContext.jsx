import { createContext, useContext, useReducer } from "react";
import Cookies from "js-cookie";
import PropTypes from "prop-types";
const AuthContext = createContext();

const initialState = {
  token: Cookies.get("accessToken") || "",
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  avtUrl: "",
  role: "",
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
    case "auth/setInform":
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        phoneNumber: action.payload.phoneNumber,
        avtUrl: action.payload.avtUrl,
        role: action.payload.role,
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

function setInformation(inform) {
  localStorage.setItem("inform", JSON.stringify(inform));
  return { type: "auth/setInform", payload: inform };
}

function logout() {
  Cookies.remove("accessToken");
  return { type: "auth/logout" };
}

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AuthContext.Provider
      value={{ ...state, dispatch, setToken, logout, setInformation }}
    >
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

import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";
import Cookies from 'js-cookie';

const getTokenCookieData = () => {
  const cookieData = Cookies.get('token');

  if (cookieData) {
    return JSON.parse(cookieData);
  }

  return null;
};

export const getTokenFromCookie = () => {
  const cookieData = getTokenCookieData();
  if (cookieData) {
    return cookieData.jwtToken;
  } else {
    return null;
  }
};

const axiosclient = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_NODE_API_URL
      : "https://27e9-2402-4000-b250-2d3d-8d89-c161-9950-d442.ngrok-free.app",
      // : "http://localhost:1000",

  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },

});

axiosclient.interceptors.request.use(
  (config) => {
    const token = getTokenFromCookie();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      delete config.headers['Authorization'];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

Session.addAxiosInterceptors(axiosclient);

export { axiosclient };

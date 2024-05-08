type ConfObj = {
  baseUrl: string;
  AUTH_URL: string;
  USERS_URL: string;
};

const urlConfig: ConfObj = {
  baseUrl: "/api/v1",
  AUTH_URL: "/api/v1/auth",
  USERS_URL: "/api/v1/user",
};

export default urlConfig;

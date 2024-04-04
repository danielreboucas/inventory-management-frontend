import api from "./api";
const baseAuthUrl = "auth";

export async function signInUser(user: {
  email: string;
  password: string;
}): Promise<{ data: []; access_token: string }> {
  const response = await api.post(baseAuthUrl + "/signin", {
    email: user.email,
    password: user.password,
  });

  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export async function signUpUser(user: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}): Promise<{ data: []; access_token: string }> {
  const response = await api.post(baseAuthUrl + "/signup", {
    email: user.email,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
  });

  return response.data;
}

export function signOutUser() {
  localStorage.removeItem("user");
}

export function authHeader() {
  const user = JSON.parse(localStorage.getItem("user") || '""');

  if (user && user.accessToken) {
    return { "x-access-token": "Bearer " + user.accessToken };
  } else {
    return {};
  }
}

export async function getUser() {
  const user = JSON.parse(localStorage.getItem("user") || '""');
  if (user && user.access_token) {
    const response = await api.get("user", {
      headers: {
        Authorization: "Bearer " + user.access_token,
      },
    });
    return { data: response.data, access_token: user.access_token };
  }
  return null;
}

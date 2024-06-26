import User from "@/types/User";
import api from "./api";
const baseAuthUrl = "auth";

export async function signInUser(
  user: User
): Promise<{ data: []; access_token: string }> {
  const response = await api.post(baseAuthUrl + "/signin", {
    email: user.email,
    password: user.password,
  });

  if (response.data.access_token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

export async function signUpUser(
  user: User
): Promise<{ data: []; access_token: string }> {
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

  if (user.user && user.access_token) {
    return "Bearer " + user.access_token;
  } else {
    return "";
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

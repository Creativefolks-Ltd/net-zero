import {get,post} from "./baseServices"

export async function getAppToken() {
    let credentials = { email: "john@example.com", password: "password" };
    const response = await post("login", credentials, false);
    return response;
  }
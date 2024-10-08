import axios from "axios";

const URL = "http://127.0.0.1:3000/api/v1";
// const URL = "https://pmq866ck-3000.uks1.devtunnels.ms/";
export const Axios = axios.create({
  baseURL: URL,
});

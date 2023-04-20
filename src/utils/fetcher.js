import axios from "axios";

export const fetcher = async (url) => {
  const { data } = await axios(url);
  return data;
};

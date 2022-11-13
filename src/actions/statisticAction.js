import axios from "../helpers/axios";

export const getRevenue = (payload) => {
  return async () => {
    const res = await axios.post(`/statistic/getRevenue`, payload);
    return res;
  };
};

import axios from 'axios';
import {ip} from '../api/ip'

export const getStatistic = async(token, id, typ) => {
  try {
    if (!id || !typ)
      return 
    const res = await axios({
      method: "get",
      data: {period: typ},
      url: `http://${ip}:5000/api/statistic/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });

    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
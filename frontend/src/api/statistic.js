import axios from 'axios';
import ip from './ip'

export const getStatistic = async(token, id, typ) => {
  try {
    if (!id || !typ)
      return 

    const res = await axios({
      method: "get",
      data: {period: typ},
      url: `http://192.168.1.11:5000/api/statistic/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
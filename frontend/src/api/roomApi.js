import axios from 'axios';

export const getRoom = async(token) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://192.168.1.56:5000/api/room",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
import axios from 'axios';

export const getRoom = async(token) => {
  try {
    const res = await axios({
      method: "get",
      url: "http://192.168.1.7:5000/api/room",
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const getRoomDetail = async(token,id) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://192.168.1.7:5000/api/room/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}


export const updateRoom = async(token,id,formValue) => {
  if( formValue.name==='' && formValue.roomType==='' )
    return;
  
  try {
    const res = await axios({
      method: "patch",
      data: formValue,
      url: `http://192.168.1.7:5000/api/room/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const deleteRoom = async(token,id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://192.168.1.7:5000/api/room/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const addRoom = async(token,formValue) => {
  if( formValue.name==='' && formValue.roomType==='' )
    return;
  
  try {
    const res = await axios({
      method: "post",
      data: formValue,
      url: `http://192.168.1.7:5000/api/room`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
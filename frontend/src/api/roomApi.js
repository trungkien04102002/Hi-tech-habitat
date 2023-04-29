import axios from 'axios';
import {ip} from '../api/ip'

export const getRoom = async(token) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://${ip}:5000/api/room`,
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
      url: `http://${ip}:5000/api/room/${id}`,
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
      url: `http://${ip}:5000/api/room/${id}`,
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
      url: `http://${ip}:5000/api/room/${id}`,
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
      url: `http://${ip}:5000/api/room`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
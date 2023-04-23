import axios from 'axios';

export const getDevice = async(token, id) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://192.168.1.35:5000/api/device/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const addDevice = async(token,formValue,id) => {
  if( formValue.name==='' && formValue.type==='' )
    return;
  
  try {
    const res = await axios({
      method: "post",
      data: formValue,
      url: `http://192.168.1.35:5000/api/device/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const deleteDevice = async(token,id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://192.168.1.35:5000/api/device/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const updateDevice = async(token,id,formValue) => {
  if( formValue.name==='' )
    return;
  
  try {
    const res = await axios({
      method: "patch",
      data: formValue,
      url: `http://192.168.1.35:5000/api/device/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const changeState = async(token,id,formValue) => {
  if( formValue.on==='' )
    return;
  
  try {
    const res = await axios({
      method: "post",
      data: formValue,
      url: `http://192.168.1.35:5000/api/device/state/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const changeMode = async(token,id,formValue) => {
  if( formValue.on==='' )
    return;
  
  try {
    const res = await axios({
      method: "post",
      data: formValue,
      url: `http://192.168.1.35:5000/api/device/mode/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
import axios from 'axios';

export const getSensor = async(token, id) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://192.168.1.35:5000/api/sensor/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const addSensor = async(token,formValue,id) => {
  if( formValue.type==='' && formValue.feed==='' )
    return;
    
  try {
    const res = await axios({
      method: "post",
      data: formValue,
      url: `http://192.168.1.35:5000/api/sensor/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const deleteSensor = async(token,id) => {
  try {
    const res = await axios({
      method: "delete",
      url: `http://192.168.1.35:5000/api/sensor/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const updateSensor = async(token,id,formValue) => {
  if( formValue.type==='' )
    return;
  
  try {
    const res = await axios({
      method: "patch",
      data: formValue,
      url: `http://192.168.1.35:5000/api/sensor/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
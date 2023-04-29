import axios from 'axios';
<<<<<<< HEAD
import {ip} from '../api/ip'
=======
import ip from './ip'

>>>>>>> 63302b944bda2e8626d154fd87e2adb7e97a623f
export const getSensor = async(token, id) => {
  try {
    const res = await axios({
      method: "get",
      url: `http://${ip}:5000/api/sensor/${id}`,
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
      url: `http://${ip}:5000/api/sensor/${id}`,
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
      url: `http://${ip}:5000/api/sensor/${id}`,
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
      url: `http://${ip}:5000/api/sensor/${id}`,
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}
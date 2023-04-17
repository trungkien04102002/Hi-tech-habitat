import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const signIn = async(formValue) => {
  if( formValue.email==='' && formValue.password==='')
    return;

  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: "http://192.168.1.56:5000/api/user/auth",
      data: formValue,
      headers: { 
          Accept: 'application/json',
          "Content-Type": "application/x-www-form-urlencoded" },
      
    });
    AsyncStorage.setItem('user', res.data.token);
    AsyncStorage.setItem('name', res.data.name);
    AsyncStorage.setItem('email', res.data.email);
    AsyncStorage.setItem('contact', res.data.contact);
    AsyncStorage.setItem('createdAt', res.data.createdAt);
    
    return res.data;
  } catch(error) {
      return error.response.data;
  }
}

export const signUp = async(formValue) => {
  if( formValue.email==='' && formValue.password==='' && formValue.name==='' && formValue.contact==='')
    return;

  try {
    // make axios post request
    const res = await axios({
      method: "post",
      url: "http://192.168.1.56:5000/api/user/register",
      data: formValue,
      headers: { 
          Accept: 'application/json',
          "Content-Type": "application/x-www-form-urlencoded" },
    });
    AsyncStorage.setItem('user', res.data.token);
    AsyncStorage.setItem('name', res.data.name);
    AsyncStorage.setItem('email', res.data.email);
    AsyncStorage.setItem('contact', res.data.contact);
    AsyncStorage.setItem('createdAt', res.data.createdAt);

    return res.data;
    } catch(error) {
        return error.response.data;
    }
}
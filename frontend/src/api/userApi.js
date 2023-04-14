import axios from 'axios';

export const signIn = async(formValue) => {

    if( formValue.email==='' || formValue.password===''){
        return;
    }

    try {
      // make axios post request
      const res = await axios({
        method: "post",
        url: "http://localhost:5000/api/user/auth",
        data: formValue,
        headers: { 
            Accept: 'application/json',
            "Content-Type": "application/x-www-form-urlencoded" },
      });
      return res.data;
    } catch(error) {
        return error;
    }
}
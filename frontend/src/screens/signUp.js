import {View, Text, Image, Animated, TouchableOpacity,TextInput} from 'react-native';
import { StyledComponent } from "nativewind";
import React, {useEffect,useState, useRef} from 'react';
import BackGround from '../components/background';
import Toast from 'react-native-toast-message';

import { signUp } from '../api/userApi';

import styles from '../style';

const SignUp = ({ navigation }) => {
    const [state, setState] = useState(true);
    const [formValue, setformValue] = useState({
        name: '',
        contact: '',
        email: '',
        password: ''
    })

    const handleChange = (event,name) => {
        setformValue({
            ...formValue,
            [name]: event.nativeEvent.text,
        });
    }

    useEffect(()=>{
        (async () => {
            const res = await signUp(formValue); 
           
            if (res && res.message) {
              Toast.show({
                type: 'error',
                text1: 'Sign Up Failed',
                text2: res.message,
                visibilityTime: 3000,
              });
            }

            else if (res) {
                localStorage.setItem("user", res.token);
                navigation.navigate("Home")
            }
        })()
    },[state]);

    const translateY = useRef(new Animated.Value(600)).current

    useEffect(() => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
        }).start();
    }, [])

    const handleHide = () => {
        Animated.timing(translateY, {
            toValue: 600,
            duration: 200,
            useNativeDriver: true
        }).start(() => navigation.navigate("SignIn"));
    }

    return (
        <BackGround>
            <StyledComponent component={View} className="h-1/3">
                <StyledComponent component={Image} className="scale-90 mx-auto " 
                source={require('../img/image_2.png')}></StyledComponent>
            </StyledComponent>

            <Animated.View 
                style={{ transform: [{ translateY }] }} 
                className="flex flex-col gap-y-4 bg-gray-300 rounded-3xl w-full items-center h-full"
            >
                <StyledComponent component={Text} className="font-black text-2xl pt-4 pb-2">Sign Up</StyledComponent>
                <TextInput onChange={event => handleChange(event, 'name')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white" placeholder="Enter Phone Number" style={styles.shadow}/>
                <TextInput onChange={event => handleChange(event, 'contact')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white" placeholder="Enter Full Name" style={styles.shadow}/>
                <TextInput onChange={event => handleChange(event, 'email')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white" placeholder="Enter Email" style={styles.shadow}/>
                <TextInput onChange={event => handleChange(event, 'password')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white mb-8" placeholder="Enter Password" style={styles.shadow}/>

                <TouchableOpacity onPress={() => setState(!state)} className="mb-4 px-8 py-3 bg-[#4682B4] rounded-md w-3/4 " style={styles.shadow}>
                    <StyledComponent component={Text} className="font-bold text-white text-xl text-center">Sign Up</StyledComponent>
                </TouchableOpacity>
                
                <StyledComponent component={View} className="flex flex-col ">
                        <StyledComponent component={Text} className="font-black font-medium text-center opacity-75">Already have an account yet?</StyledComponent>
                        <StyledComponent component={Text} onPress={handleHide} className="font-bold text-center text-blue-600 underline">Login here</StyledComponent>
                    </StyledComponent>

            </Animated.View>
            <Toast toastRef={(toastRef) => Toast.setRef(toastRef)}/>
        </BackGround>
    );
}

export default SignUp;

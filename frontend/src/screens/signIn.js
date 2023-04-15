import {View, Text, Image, TouchableOpacity,TextInput, Animated} from 'react-native';
import { StyledComponent } from "nativewind";
import React, {useEffect,useState, useRef, useLayoutEffect} from 'react';
import { useIsFocused } from '@react-navigation/native';
import BackGround from '../components/background';
import Toast from 'react-native-toast-message';

import { signIn } from '../api/userApi';

import styles from '../style';

const SignIn = ({ navigation }) => {
    const [state,setState] = useState(true)
    const [formValue, setformValue] = useState({
        email:'',
        password:'' 
    });

    const handleChange = (event,name) => {
        setformValue({
            ...formValue,
            [name]: event.nativeEvent.text,
        });
    }

    useEffect(()=>{
        (async () => {
            const res = await signIn(formValue); 
           
            if (res && res.message) {
              Toast.show({
                type: 'error',
                text1: 'Login Failed',
                text2: res.message,
                visibilityTime: 3000,
              });
            }

            else if (res) {
                navigation.navigate("Home")
            }
        })()
    },[state]);

    const isFocused = useIsFocused();
    const translateY = useRef(new Animated.Value(500)).current

    useLayoutEffect(() => {
        if (isFocused) {
            Animated.timing(translateY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true
            }).start();
        }
    }, [isFocused])

    useEffect(() => {
        if (!isFocused) {
            translateY.setValue(500)
        }
    }, [isFocused])

    const handleHide = () => {
        Animated.timing(translateY, {
            toValue: 500,
            duration: 200,
            useNativeDriver: true
        }).start(() => navigation.navigate("SignUp"));
    }

    return (
        <BackGround> 
            <StyledComponent component={View} className="items-center flex flex-col h-full w-full ">
                <View className="h-1/2">
                    <Image
                        className="scale-90 mx-auto" 
                        source={require('../img/image_2.png')}
                    >
                    </Image>
                </View>

                <Animated.View 
                    style={{ transform: [{ translateY }] }} 
                    className="flex flex-col gap-y-4 bg-gray-300 rounded-3xl w-full items-center h-full"
                >
                    <Text className="font-black text-2xl pt-4 pb-2">Sign In</Text>
                    <TextInput onChange={event => handleChange(event,'email')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white" placeholder="Enter email" style={styles.shadow}></TextInput>
                    <TextInput onChange={event => handleChange(event,'password')} className="py-2.5 rounded-xl border w-3/4 px-4 bg-white border-white mb-4" placeholder="Enter password" style={styles.shadow}></TextInput>
                    <TouchableOpacity onPress={() => setState(!state)} className="mb-4 px-8 py-3 bg-[#4682B4] rounded-md w-3/4 " style={styles.shadow}>
                        <Text component={Text} className="font-bold text-white text-xl text-center">Login</Text>
                    </TouchableOpacity>

                    <View className="flex flex-col ">
                        <Text className="font-black font-medium text-center opacity-75">Don’t have an account yet?</Text>
                        <Text onPress={handleHide} className="font-bold text-center text-blue-600 underline">Create an account</Text>
                    </View>
        
                </Animated.View>
            </StyledComponent>
            <Toast toastRef={(toastRef) => Toast.setRef(toastRef)}/>
        </BackGround>
    );
}

export default SignIn;
